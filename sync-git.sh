#!/bin/bash

while true; do
    # Fetch latest changes
    git fetch origin >/dev/null 2>&1

    # Check if we're behind the remote
    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse @{u})

    if [ $LOCAL != $REMOTE ]; then
        echo "$(date): Changes detected, pulling from remote..."
        git pull origin main
        echo "$(date): Sync completed"
    else
        echo "$(date): No changes, already up to date"
    fi

    sleep 2
done