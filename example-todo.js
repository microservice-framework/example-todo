/**
 * Profile Stats MicroService.
 */
'use strict';

const framework = '@microservice-framework';
const Cluster = require(framework + '/microservice-cluster');
const Microservice = require(framework + '/microservice');
const MicroserviceRouterRegister = require(framework + '/microservice-router-register').register;


require('dotenv').config();

let mongoUrl = '';
if( process.env.MONGO_URL) {
  mongoUrl = mongoUrl + process.env.MONGO_URL;
}

if( process.env.MONGO_DATABASE) {
  mongoUrl = mongoUrl + process.env.MONGO_DATABASE;
}

if( process.env.MONGO_OPTIONS) {
  mongoUrl = mongoUrl + process.env.MONGO_OPTIONS;
}

let mservice = new Microservice({
  mongoUrl: mongoUrl,
  mongoTable: process.env.MONGO_TABLE,
  secureKey: process.env.SECURE_KEY,
  schema: process.env.SCHEMA
});

let mControlCluster = new Cluster({
  pid: process.env.PIDFILE,
  port: process.env.PORT,
  hostname: process.env.HOSTNAME,
  count: process.env.WORKERS,
  callbacks: {
    init: exampleINIT,
    validate: mservice.validate,
    POST: mservice.post,
    GET: mservice.get,
    PUT: mservice.put,
    DELETE: mservice.delete,
    SEARCH: mservice.search,
    OPTIONS: mservice.options
  }
});

/**
 * Init Handler.
 */
function exampleINIT(cluster, worker, address) {
  if (worker.id == 1) {
    let mserviceRegister = new MicroserviceRouterRegister({
      server: {
        url: process.env.ROUTER_URL,
        secureKey: process.env.ROUTER_SECRET,
        period: process.env.ROUTER_PERIOD,
      },
      route: {
        path: [process.env.SELF_PATH],
        url: process.env.SELF_URL,
        secureKey: process.env.SECURE_KEY
      },
      cluster: cluster
    });
  }
}
