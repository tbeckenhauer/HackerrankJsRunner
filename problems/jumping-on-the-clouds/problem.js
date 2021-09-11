'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'jumpingOnClouds' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY c as parameter.
 */

function jumpingOnClouds(c) {
    function getNextJump(cloulds) {
        if(clouds[1] == 1) {
            console.log("Jump 1")
            clouds.shift();
            return clouds;
        } else {
            console.log("Jump 2")
            clouds.shift();
            clouds.shift();
            return clouds;
        }
    }
    let clouds = c;
    let totalNumJumps = 0;
    while(clouds.length > 1) {
        clouds = getNextJump(clouds);
        totalNumJumps += 1;
    }
    return totalNumJumps;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const c = readLine().replace(/\s+$/g, '').split(' ').map(cTemp => parseInt(cTemp, 10));

    const result = jumpingOnClouds(c);

    ws.write(result + '\n');

    ws.end();
}
