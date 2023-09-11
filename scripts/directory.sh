#!/bin/bash

# note: this script wasn't used to setup the directory structure, i've kept this anyway.

# List of components
COMPONENTS=(
    blog
    event
    asset
    application
    notice
)

# List of directories
DIRECTORIES=(
    controller
    model
    dto
    route
    service
)

# Loop through each directory and create files for components
for DIR in "${DIRECTORIES[@]}"; do
    cd "$DIR"
    
    for COMPONENT in "${COMPONENTS[@]}"; do
        FILE_NAME="${COMPONENT}.${DIR}.ts"
        touch "$FILE_NAME"
        echo "Created $DIR/$FILE_NAME"
    done

    cd ..
done