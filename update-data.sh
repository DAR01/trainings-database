#!/bin/bash
# You need "rows" (Python tool) installed to run this script. You can do it by
# executing:
#     pip install rows rows[cli]

URL="https://docs.google.com/spreadsheets/d/1vBtzF3JQ5zjoyNLs1asAKn0Dxy6WqUmSynxBRtlu988/export?format=csv"
OUTPUT="data/trainings.json"

rows --http-cache=no convert "$URL" "$OUTPUT"
