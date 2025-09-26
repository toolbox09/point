# Advanced Git Auto-Sync Script with Conflict Resolution
# PowerShell version for Windows

param(
    [int]$Interval = 3,
    [switch]$Verbose = $false
)

$ErrorActionPreference = "Stop"

function Write-Log {
    param($Message, $Color = "White")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "[$timestamp] $Message" -ForegroundColor $Color
}

function Test-GitRepo {
    try {
        & git rev-parse --git-dir | Out-Null
        return $true
    } catch {
        return $false
    }
}

function Get-BranchStatus {
    $local = & git rev-parse HEAD 2>$null
    $remote = & git rev-parse '@{u}' 2>$null

    if ($local -eq $remote) {
        return "up-to-date"
    } elseif (-not $remote) {
        return "no-upstream"
    } else {
        $base = & git merge-base HEAD '@{u}' 2>$null
        if ($local -eq $base) {
            return "behind"
        } elseif ($remote -eq $base) {
            return "ahead"
        } else {
            return "diverged"
        }
    }
}

function Resolve-SimpleConflicts {
    $conflictFiles = & git diff --name-only --diff-filter=U
    $resolvedCount = 0

    foreach ($file in $conflictFiles) {
        Write-Log "Attempting to resolve conflict in: $file" -Color "Yellow"

        # Special handling for .claude/settings.local.json
        if ($file -eq ".claude/settings.local.json") {
            $content = Get-Content $file -Raw

            # Remove conflict markers and merge both sides
            $resolved = $content -replace '<<<<<<< HEAD\r?\n', '' `
                                -replace '=======\r?\n', '' `
                                -replace '>>>>>>> [^\r\n]+\r?\n', '' `
                                -replace '(\s+)"([^"]+)"(\s*,?\s*)(\r?\n\s+)"([^"]+)"(\s*,?\s*)', '$1"$2"$3$4"$5"$6'

            # Remove duplicate entries
            $lines = $resolved -split "`n"
            $uniqueLines = @()
            $seen = @{}

            foreach ($line in $lines) {
                $trimmed = $line.Trim()
                if ($trimmed -match '"Bash\([^"]+\)"' -and $seen.ContainsKey($trimmed)) {
                    continue
                }
                $seen[$trimmed] = $true
                $uniqueLines += $line
            }

            $resolved = $uniqueLines -join "`n"
            Set-Content -Path $file -Value $resolved -NoNewline

            & git add $file
            $resolvedCount++
            Write-Log "Auto-resolved conflict in $file" -Color "Green"
        }
        # Add more file-specific conflict resolution patterns here
    }

    return $resolvedCount
}

function Sync-Repository {
    if (-not (Test-GitRepo)) {
        Write-Log "Not a Git repository!" -Color "Red"
        return $false
    }

    try {
        # Fetch latest changes
        if ($Verbose) { Write-Log "Fetching from origin..." -Color "Cyan" }
        & git fetch origin 2>$null

        $status = Get-BranchStatus

        switch ($status) {
            "up-to-date" {
                if ($Verbose) { Write-Log "Repository is up to date" -Color "Green" }
                return $true
            }

            "behind" {
                Write-Log "Changes detected, pulling from remote..." -Color "Yellow"
                & git pull origin main 2>$null

                if ($LASTEXITCODE -eq 0) {
                    Write-Log "Successfully synced with remote" -Color "Green"
                    return $true
                } else {
                    Write-Log "Pull failed, checking for conflicts..." -Color "Orange"
                    return Handle-MergeConflicts
                }
            }

            "ahead" {
                Write-Log "Local changes ahead of remote, pushing..." -Color "Blue"
                & git push origin main 2>$null

                if ($LASTEXITCODE -eq 0) {
                    Write-Log "Successfully pushed local changes" -Color "Green"
                    return $true
                } else {
                    Write-Log "Push failed, may need to pull first" -Color "Orange"
                    return $false
                }
            }

            "diverged" {
                Write-Log "Branches have diverged, attempting merge..." -Color "Yellow"
                & git pull origin main 2>$null
                return Handle-MergeConflicts
            }

            "no-upstream" {
                Write-Log "No upstream branch configured" -Color "Orange"
                return $false
            }
        }
    } catch {
        Write-Log "Error during sync: $_" -Color "Red"
        return $false
    }
}

function Handle-MergeConflicts {
    $conflictFiles = & git diff --name-only --diff-filter=U

    if ($conflictFiles.Count -eq 0) {
        Write-Log "No conflicts to resolve" -Color "Green"
        return $true
    }

    Write-Log "Found $($conflictFiles.Count) files with conflicts" -Color "Yellow"

    $resolvedCount = Resolve-SimpleConflicts
    $remainingConflicts = & git diff --name-only --diff-filter=U

    if ($remainingConflicts.Count -eq 0) {
        Write-Log "All conflicts resolved automatically ($resolvedCount files)" -Color "Green"

        # Complete the merge
        $commitMessage = @"
Auto-merge: Resolve conflicts automatically

Resolved conflicts in:
$($conflictFiles -join "`n- ")

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
"@

        & git commit -m $commitMessage 2>$null

        if ($LASTEXITCODE -eq 0) {
            Write-Log "Merge completed successfully" -Color "Green"

            # Push the merge commit
            git push origin main 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Log "Merge pushed to remote" -Color "Green"
                return $true
            }
        }
    } else {
        Write-Log "Manual intervention required for remaining conflicts:" -Color "Red"
        foreach ($file in $remainingConflicts) {
            Write-Log "  - $file" -Color "Red"
        }
        return $false
    }
}

# Main execution loop
Write-Log "Starting Auto-Sync (interval: ${Interval}s, verbose: $Verbose)" -Color "Cyan"

try {
    while ($true) {
        Sync-Repository | Out-Null
        Start-Sleep -Seconds $Interval
    }
} catch {
    Write-Log "Script interrupted: $_" -Color "Red"
} finally {
    Write-Log "Auto-Sync stopped" -Color "Cyan"
}