@echo off
:loop
git fetch origin >nul 2>&1
git status | findstr "Your branch is behind" >nul
if %errorlevel% equ 0 (
    echo %date% %time%: Changes detected, pulling from remote...
    git pull origin main
    echo %date% %time%: Sync completed
) else (
    echo %date% %time%: No changes, already up to date
)
timeout /t 10 /nobreak >nul
goto loop