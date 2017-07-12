#!/usr/bin/env node

require('node-env-file')( `${__dirname}/../.env` )

const Mongo = require('mongodb')

Mongo.MongoClient.connect( process.env.MONGODB )
.then( db => db.createCollection('DiscType') )
.catch( e => { console.log( e.stack || e ); process.exit(1) } )
.then( () => process.exit(0) )
