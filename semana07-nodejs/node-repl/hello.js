"use strict";

let readline = require('readline');

const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

readInterface.question('What is your name? ', name => {
    console.log(`Hi ${name}!`);
    readInterface.close();
});
