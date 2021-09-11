#!/usr/local/bin/node

const { spawn } = require('child_process');
const fs = require('fs');

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}

getDirectories('./problems/').forEach(function (dir) {
  let child = spawn( 'node', [
      `./problems/${dir}/problem.js`], { 
      env: { ...process.env, OUTPUT_PATH: `./problems/${dir}/output.actual.txt` } } 
  );

  fs.readFile(`./problems/${dir}/input.txt`, 'utf8', function(err, data) {
    if (err) throw err;
    child.stdin.write(data);
    child.stdin.end();
  });

  fs.readFile(`./problems/${dir}/output.txt`, 'utf8', function(err, dataExpected) {
    fs.readFile(`./problems/${dir}/output.actual.txt`, 'utf8', function(err, dataActual) {
      if (err) throw err;
      dataActual = dataActual.trim();
      dataExpected = dataExpected.trim();
      if (dataExpected === dataActual) {
        console.log(`${dir} OK`);
      } else {
        console.error(`${dir} FAIL`);
        console.error(`Actual: ${dataActual}`);
        console.error(`Expected: ${dataExpected}`);
      }
    });
  });
});
