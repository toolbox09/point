#!/bin/bash

# Advanced Git Auto-Sync Script with Conflict Resolution
# Bash version for Linux/Mac

INTERVAL=3
VERBOSE=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -i|--interval)
            INTERVAL="$2"
            shift 2
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        *)
            echo "Usage: $0 [-i|--interval SECONDS] [-v|--verbose]"
            exit 1
            ;;
    esac
done

log() {
    local message="$1"
    local color="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    case $color in
        "red") echo -e "\033[31m[$timestamp] $message\033[0m" ;;
        "green") echo -e "\033[32m[$timestamp] $message\033[0m" ;;
        "yellow") echo -e "\033[33m[$timestamp] $message\033[0m" ;;
        "blue") echo -e "\033[34m[$timestamp] $message\033[0m" ;;
        "cyan") echo -e "\033[36m[$timestamp] $message\033[0m" ;;
        "orange") echo -e "\033[91m[$timestamp] $message\033[0m" ;;
        *) echo "[$timestamp] $message" ;;
    esac
}

is_git_repo() {
    git rev-parse --git-dir >/dev/null 2>&1
}

get_branch_status() {
    local local_commit=$(git rev-parse @ 2>/dev/null)
    local remote_commit=$(git rev-parse @{u} 2>/dev/null)

    if [[ "$local_commit" == "$remote_commit" ]]; then
        echo "up-to-date"
    elif [[ -z "$remote_commit" ]]; then
        echo "no-upstream"
    else
        local base=$(git merge-base @ @{u} 2>/dev/null)
        if [[ "$local_commit" == "$base" ]]; then
            echo "behind"
        elif [[ "$remote_commit" == "$base" ]]; then
            echo "ahead"
        else
            echo "diverged"
        fi
    fi
}

resolve_simple_conflicts() {
    local conflict_files=($(git diff --name-only --diff-filter=U))
    local resolved_count=0

    for file in "${conflict_files[@]}"; do
        log "Attempting to resolve conflict in: $file" "yellow"

        # Special handling for .claude/settings.local.json
        if [[ "$file" == ".claude/settings.local.json" ]]; then
            # Remove conflict markers and merge both sides
            sed -i '/^<<<<<<< HEAD$/d; /^=======$/d; /^>>>>>>> /d' "$file"

            # Remove duplicate entries using awk
            awk '
            /"Bash\([^"]+\)"/ {
                if (!seen[$0]) {
                    seen[$0] = 1
                    print
                }
                next
            }
            { print }
            ' "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"

            git add "$file"
            ((resolved_count++))
            log "Auto-resolved conflict in $file" "green"
        fi
        # Add more file-specific conflict resolution patterns here
    done

    echo $resolved_count
}

handle_merge_conflicts() {
    local conflict_files=($(git diff --name-only --diff-filter=U))

    if [[ ${#conflict_files[@]} -eq 0 ]]; then
        log "No conflicts to resolve" "green"
        return 0
    fi

    log "Found ${#conflict_files[@]} files with conflicts" "yellow"

    local resolved_count=$(resolve_simple_conflicts)
    local remaining_conflicts=($(git diff --name-only --diff-filter=U))

    if [[ ${#remaining_conflicts[@]} -eq 0 ]]; then
        log "All conflicts resolved automatically ($resolved_count files)" "green"

        # Complete the merge
        local commit_message="Auto-merge: Resolve conflicts automatically

Resolved conflicts in:
$(printf -- "- %s\n" "${conflict_files[@]}")

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

        git commit -m "$commit_message" >/dev/null 2>&1

        if [[ $? -eq 0 ]]; then
            log "Merge completed successfully" "green"

            # Push the merge commit
            git push origin main >/dev/null 2>&1
            if [[ $? -eq 0 ]]; then
                log "Merge pushed to remote" "green"
                return 0
            fi
        fi
    else
        log "Manual intervention required for remaining conflicts:" "red"
        for file in "${remaining_conflicts[@]}"; do
            log "  - $file" "red"
        done
        return 1
    fi
}

sync_repository() {
    if ! is_git_repo; then
        log "Not a Git repository!" "red"
        return 1
    fi

    # Fetch latest changes
    [[ "$VERBOSE" == "true" ]] && log "Fetching from origin..." "cyan"
    git fetch origin >/dev/null 2>&1

    local status=$(get_branch_status)

    case $status in
        "up-to-date")
            [[ "$VERBOSE" == "true" ]] && log "Repository is up to date" "green"
            return 0
            ;;

        "behind")
            log "Changes detected, pulling from remote..." "yellow"
            git pull origin main >/dev/null 2>&1

            if [[ $? -eq 0 ]]; then
                log "Successfully synced with remote" "green"
                return 0
            else
                log "Pull failed, checking for conflicts..." "orange"
                handle_merge_conflicts
                return $?
            fi
            ;;

        "ahead")
            log "Local changes ahead of remote, pushing..." "blue"
            git push origin main >/dev/null 2>&1

            if [[ $? -eq 0 ]]; then
                log "Successfully pushed local changes" "green"
                return 0
            else
                log "Push failed, may need to pull first" "orange"
                return 1
            fi
            ;;

        "diverged")
            log "Branches have diverged, attempting merge..." "yellow"
            git pull origin main >/dev/null 2>&1
            handle_merge_conflicts
            return $?
            ;;

        "no-upstream")
            log "No upstream branch configured" "orange"
            return 1
            ;;
    esac
}

# Trap Ctrl+C
trap 'log "Script interrupted" "red"; exit 0' INT

# Main execution loop
log "Starting Auto-Sync (interval: ${INTERVAL}s, verbose: $VERBOSE)" "cyan"

while true; do
    sync_repository
    sleep $INTERVAL
done