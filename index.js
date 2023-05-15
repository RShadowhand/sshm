const _argv = [...Deno.args];
const config_file_path = `${Deno.env.get("HOME")}/.config/sshm.conf`;
try {
  Deno.statSync(config_file_path);
}
catch(err){
  Deno.writeTextFileSync(config_file_path, "[]");
}
const _config = new Map(JSON.parse(Deno.readTextFileSync(config_file_path)));
const command_or_profile = _argv[0];

if(["help"].includes(command_or_profile)){
  console.log("Welcome to SSHM -- Version 1.0");
  console.log("");
  console.log("Usage:");
  console.log("sshm help");
  console.log("  Shows this wall of text.");
  console.log("");
  console.log("sshm add <name> <target>");
  console.log("  Add a new target.");
  console.log("  Example: sshm add myvps \"mario@myvps.com -p3456\"");
  console.log("");
  console.log("sshm del <name>");
  console.log("  Delete an existing target.");
  console.log("  Example: sshm del myvps");
  console.log("");
  console.log("sshm list");
  console.log("  List all targets.");
  console.log("");
  console.log("sshm <name>");
  console.log("  Return the connection from named profile.");
  console.log("  Example: sshm myvps");
  console.log("");
  Deno.exit(1);
}

if(command_or_profile == "add"){
  const profile_name = _argv[1];
  const ssh_target = _argv[2];
  
  if([undefined, null, ""].includes(profile_name) || [undefined, null, ""].includes(ssh_target)){
    console.log("SSHM - Incorrect number of arguments passed. run \"sshm help\" to see examples.")
    Deno.exit(1);
  }
  if(_config.has(profile_name)){
    console.log("SSHM - A profile with the same name exists! Please provide a new one.")
    Deno.exit(1);
  }
  _config.set(profile_name, ssh_target);
  Deno.writeTextFileSync(config_file_path, JSON.stringify(Array.from(_config.entries())));
  console.log(`SSHM - Added ${profile_name} to the config.`);
  Deno.exit();
}

if(command_or_profile == "del"){
  const profile_name = _argv[1];
  if([undefined, null, ""].includes(profile_name)){
    console.log("SSHM - Incorrect number of arguments passed. run \"sshm help\" to see examples.")
    Deno.exit(1);
  }
  if(!_config.has(profile_name)){
    console.log("SSHM - No profile with that name was found.")
    Deno.exit(1);
  }
  _config.delete(profile_name);
  Deno.writeTextFileSync(config_file_path, JSON.stringify(Array.from(_config.entries())));
  console.log(`SSHM - Deleted ${profile_name} from the config.`);
  Deno.exit();
}

if(command_or_profile == "list"){
  console.log(`List of targets:`);
  for(var [name,target] of _config.entries()){
    console.log(`- ${name}: ${target}`);
  }
  Deno.exit();
}

// if(command_or_profile == "install"){
//   console.log(`Add the following line to your .bashrc or .zshrc file. Then reload your rc file.`);
//   console.log(`  ssc(){ SSHM=$(which sshm); SSH=$(which ssh); MOD_CMDS=("add", "del"); HELP_CMDS=("help", "list", "install"); TARGET=$($SSHM $1); SUCCESS=$?; if echo "\${MOD_CMDS[@]}" | grep -qw "$1"; then echo "SSHM - To add or delete targets, please use sshm instead."; return 0; fi; if echo "\${HELP_CMDS[@]}" | grep -qw "$1"; then echo "$TARGET"; return 0; fi; if [ "$SUCCESS" = 1 ]; then echo "$TARGET"; else $SSH $($SSHM $1); fi }`);
//   Deno.exit();
// }
if([null,undefined,""].includes(command_or_profile)){
  console.log("SSHM - No profile or command with that name was found.");
  console.log("For help, type \"sshm help\" or \"ssc help\"");
  Deno.exit(1);
}
if(!_config.has(command_or_profile)){
  console.log("SSHM - No profile or command with that name was found.");
  console.log("For help, type \"sshm help\" or \"ssc help\"");
  Deno.exit(1);
}
console.log(_config.get(command_or_profile));
Deno.exit();
