'use strict';
const fs = require('fs');
require('dotenv').config();

if (process.env.PIDFILE) {
  try{
    var pid = fs.readFileSync(process.env.PIDFILE);
    process.kill(pid, 'SIGHUP');
  }catch(e) {}
}
