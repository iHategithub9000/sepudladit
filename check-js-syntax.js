const fs = require('fs');
const path = require('path');



if (process.argv.includes("captureLog")){
    const logFile = path.join(process.cwd(), 'syntax_check_log.txt');
    fs.writeFileSync(logFile, '');
    console.oldLog = console.log;
    console.log = (...args) => {
        const message = args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' ');
        fs.appendFileSync(logFile, message + '\n');
        console.oldLog(...args);
    }
    console.log("captureLog argument present, console.log has been patched")
}

if (process.argv.includes("help")){
    console.log("Args: \ncaptureLog - captures log into file\nhelp - shows help\nincludeModules - prevents excluding node_modules from check\nbreakOnFail - breaks on check fail")
    process.exit()
}

const { execSync } = require('child_process');
function findJsFiles(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(findJsFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('js')) {
      files.push(fullPath);
    }
  }
  return files;
}
const root = process.cwd();
const jsFiles = findJsFiles(root);
let hadError = false;
const maxbound = jsFiles.length;
let count = 0;let skipcount = 0;let failcount = 0;let successcount = 0;
console.log(`Found ${maxbound} JavaScript files. Checking syntax...`);
for (const file of jsFiles) {
  try {
    if (file.endsWith(__filename) || (!process.argv.includes("includeModules") && file.includes("node_modules"))) {
        console.log(`(${++count}/${maxbound}) SKIP: ${file}`);
        ++skipcount
        continue
    };
    execSync(`node --check "${file}"`, { stdio: 'pipe' });
    console.log(`(${++count}/${maxbound}) OK: ${file}`);
    ++successcount
  } catch (err) {
    if (process.argv.includes("breakOnFail")) {console.log("breakOnFail argument present, breaking");process.exit(1)};
    ++failcount
    console.log(`(${++count}/${maxbound}) ERROR: ${file}`);
    msg=err.message.split("\n");
    msgS='';
    for (const e of msg) {
        msgS+=` | ${e}\n`;
    }
    console.log(msgS);
    hadError = true;
  }
}

console.log(`---SYNTAX TEST RESULTS---\nTotal files: ${count}\nFailed files: ${failcount}\nSuccess files: ${successcount}\nSkipped files: ${skipcount}\n-------------------------`)

if (hadError) process.exit(1);
