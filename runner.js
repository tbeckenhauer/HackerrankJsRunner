#!/usr/local/bin/node

const { spawn } = require('child_process');
const fs = require('fs');

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + '/' + file).isDirectory();
  });
}

getDirectories('./problems/')
  .sort((a, b) => { return a - b })
  .forEach(function (problem) {
    getDirectories(`./problems/${problem}/testcases/`)
      .sort((a, b) => { return a - b })
      .forEach(function (testcase) {
        const out = fs.openSync(`./problems/${problem}/testcases/${testcase}/stdout.log`, "w");
        const err = fs.openSync(`./problems/${problem}/testcases/${testcase}/stderr.log`, "w");
        let child = spawn('node', [
          `./problems/${problem}/problem.js`], {
          env: { ...process.env, OUTPUT_PATH: `./problems/${problem}/testcases/${testcase}/output.actual.txt` },
          stdio: [null, out, err]
        });

        fs.readFile(`./problems/${problem}/testcases/${testcase}/input.txt`, 'utf8', function (err, data) {
          if (err) throw err;
          child.stdin.write(data);
          child.stdin.end();
        });

        fs.readFile(`./problems/${problem}/testcases/${testcase}/output.expected.txt`, 'utf8', function (err, dataExpected) {
          fs.readFile(`./problems/${problem}/testcases/${testcase}/output.actual.txt`, 'utf8', function (err, dataActual) {
            if (err) throw err;
            dataActual = dataActual.trim();
            dataExpected = dataExpected.trim();
            if (dataExpected === dataActual) {
              console.log(`${problem}/${testcase} OK`);
            } else {
              console.error(`${problem}/${testcase} FAIL`);
              console.error(`Actual: ${dataActual}`);
              console.error(`Expected: ${dataExpected}`);
            }
          });
        });
      });

  });
