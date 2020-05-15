const { exec } = require("child_process");
exec(`${"../../node_modules/typescript/bin/tsc"}`, (error, stdout, stderr) => {
  if (error) {
    return;
  }
  console.log("stderr", stderr);
  console.log("stdout", stdout);
});
