# SSHM - SSH Manager

## Reason
I was frusturated with all the SSH connection managers out there, so I made my own in an afternoon. (see [XKCD#927](https://xkcd.com/927/))  

## Notes
- I built this on `Deno v1.33`. No support for below or above this version. It might work but I didn't test it. This was done in an afternoon after all.  
- Do not ask for a prebuilt binary, it's safer for you to build it yourself on whatever platform you plan to use this on.  
- May or may not be compatible with Windows, I didn't test it. Works in WSL2.  
  `ssc` command will never work on Windows directly unless someone makes a PR with a batch file.
- No external dependencies were used.
- There are a lot of bad choices made here but the name of the game is speed.
- Feel free to suggest improvements or make PRs.
- The config file for SSHM is in `~/.config/sshm.conf`

## How to build and install:
- Run `deno compile -A index.js -o sshm`  
  This builds sshm in the directory.
- OR Run `./build_and_link.sh`  
  This builds sshm and makes symbolic links in /usr/bin/sshm
- OR Run `./build_and_move.sh`  
  This builds sshm and moves the binaries to /usr/bin/sshm

## How to use:
- First, install the binary by using one of the methods above.
- Run `sshm help` to see your options and examples.
- To add a profile `sshm add <name> "<connection string and options>"`
  - Example: `sshm add myvps "mario@myvps.com -p3456"`
  - Example: `sshm add myvps_tunnel "mario@myvps.com -p3456 -L80:myothervps.com:80"`
- To delete a profile: `sshm del <name>`
- To modify a profile: There's no such command.  
  First do `sshm <name>` to get the connection string.  
  Then `sshm del <name>`  
  Then `sshm add <name> <new connection string and options>`
- To quickly connect to a profile, use the `ssc <name>` command.
  - You can NOT add new ssh connection options while using the `ssc` command.  
    To do that, you can do `ssh $(sshm <name>) --more-options-here`.

### How to uninstall
- Run `./uninstall.sh` 

# License
- Do whatever you want as long as you don't directly make money off of this.
- Contact me if you want to make money off of this.
- Mention me and this repo if you are going to build off of this.
