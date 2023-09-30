#!/bin/bash

getopts c: flag;

remote_host=pna;
remote_dest=/var/www/shhroom/html/;

log=deploy.log

if [ $flag = c ]
  then
    remote_host=${OPTARG};
fi

echo "Establishing ssh connection to $remote_host to set permissions. You'll be asked for your remote sudo password." | tee $log;

ssh -t "$remote_host" /srv/permissions.sh;

if [ $? -ne 0 ]
then
  echo "Error setting permissions. Exiting..." | tee -a $log
  exit 1;
fi

echo "Permissions set. Running build..." | tee -a $log;

npm run build;

if [ $? -ne 0 ]
then
  echo "Error encountered during build process. Exiting..." | tee -a $log
  exit 2;
fi

echo "Build complete. Uploading files..." | tee -a $log;

rsync --verbose --recursive --update --size-only --mkpath --delete --delete-delay dist/ $remote_host:$remote_dest;

if [ $? -ne 0 ]
then
  echo "Error encountered during remote sync. Exiting..." | tee - a $log
  exit 3;
fi

echo "Done!" | tee -a $log;

exit 0;
