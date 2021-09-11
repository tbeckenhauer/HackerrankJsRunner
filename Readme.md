No dependencies other than nodejs.

Just run `./runner.js` or `node runner.js` depending on your system.

You will see results like this:
> jumping-on-the-clouds/2 OK\
> jumping-on-the-clouds/0 OK

Then your solution is correct.

If you see results like this:\
jumping-on-the-clouds/0 FAIL\
Actual: 5\
Expected: 4\
jumping-on-the-clouds/2 OK

You can check the logs\
`cat problems/jumping-on-the-clouds/testcases/0/stdout.log`

> Jump 1\
> Jump 2\
> Jump 2\
> Jump 1\
> Jump 2\
> Jump 2

You have to call `console.log("...")` to see messages in the logs.

