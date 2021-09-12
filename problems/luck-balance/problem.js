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
 * Complete the 'luckBalance' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. 2D_INTEGER_ARRAY contests
 */

function luckBalance(k, contests) {
    console.log(contests)
    var sortedContests = contests.sort((a, b) => {
        if (a[1] > b[1]) {
        } else if (a[1] === b[1]) {
            if(a[0] > b[0]) {
                return -1;
            } else {
                return 1;
            }
        } else {
            return -1;
        }
    })
    let i1 = 0;
    let i2 = 0;
    let goodluck = 0;
    while(i1 < sortedContests.length) {
        if(sortedContests[i1][1] === 1) {
            if(i2 < k) {
                goodluck += sortedContests[i1][0];
            } else {
                goodluck -= sortedContests[i1][0];
            }
            i2 += sortedContests[i1][1];
        } else {
            goodluck += sortedContests[i1][0];
        }
        i1++;
    }
    return goodluck;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    let contests = Array(n);

    for (let i = 0; i < n; i++) {
        contests[i] = readLine().replace(/\s+$/g, '').split(' ').map(contestsTemp => parseInt(contestsTemp, 10));
    }

    const result = luckBalance(k, contests);

    ws.write(result + '\n');

    ws.end();
}
