#!/bin/bash

# fail on some errors
set -e

# our output path for .css files
OUTPUT_DIR=./../dist/static/css/

# run our commands from this directory
cd "$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

# create the directory if it doesn't exist already
mkdir -p ./../dist/static/css

sass --update ./../src/sass:./../dist/static/css

# files should be transpiled successfully