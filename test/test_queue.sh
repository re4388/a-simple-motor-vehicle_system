#!/bin/bash

# Endpoint URL
URL="http://localhost:3011/api/v1/audio/transcode"

# Number of iterations
ITERATIONS=100

# Loop for the specified number of iterations
for ((i=1; i<=$ITERATIONS; i++))
do
  echo "Running iteration $i"

  # Send the POST request using curl
  curl -X POST $URL

  echo "Iteration $i complete"
done
