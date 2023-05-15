rm /usr/bin/sshm /usr/bin/ssc &&
deno compile -A index.js -o sshm && 
ln -s $(pwd)/sshm /usr/bin/sshm &&
ln -s $(pwd)/ssc /usr/bin/ssc
