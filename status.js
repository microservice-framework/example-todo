'use strict';
const fs = require('fs');
require('dotenv').config();

var pid = false;
if (process.env.PIDFILE) {
  try{
    pid = fs.readFileSync(process.env.PIDFILE).toString('utf8');
  }catch(e) {}
}

var result = {}
result[process.env.npm_package_name] = pid;
console.log(JSON.stringify(result));
