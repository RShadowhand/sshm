rm /usr/bin/sshm /usr/bin/ssc &&
deno compile -A index.js -o sshm && 
mv $(pwd)/sshm /usr/bin/sshm &&
cp $(pwd)/ssc /usr/bin/ssc
