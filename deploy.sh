#!/bin/bash

getopts c: flag;

remote_host=pna;
remote_dest=/var/www/shhroom/html/
dry=

if [ $flag = c ]
  then
    remote_host=${OPTARG};
fi

echo "Establishing ssh connection to $remote_host to set permissions. You'll be asked for your remote sudo password." | tee deploy.log;

ssh -t "$remote_host" /srv/permissions.sh | tee -a deploy.log;

echo "Permissions set. Running build..." | tee -a deploy.log;

npm run build | tee -a deploy.log;

echo "Build complete. Uploading files..." | tee -a deploy.log;

rsync --verbose --dirs --update --size-only --mkpath --delete --delete-delay dist/ $remote_host:$remote_dest | tee -a deploy.log;

echo "Done!" | tee -a deploy.log;

exit 0;