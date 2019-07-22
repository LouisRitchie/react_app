#!/bin/sh

#-------------------------------------------------------------------------------
# This script starts the server and restarts it on updates to the dist folder.
#-------------------------------------------------------------------------------

sigint_handler()
{
  kill $PID
  exit
}

trap sigint_handler INT

while true; do
  node dist/server.js &
  PID=$!
  echo server started $(date +"%r")
  inotifywait -e modify -e create -e delete -rqq dist
  sleep 0.2
  echo -n "files were changed; restarting.\t"
  kill $PID
done
