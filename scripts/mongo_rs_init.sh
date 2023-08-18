#!/bin/bash

m1=mongo1
m2=mongo2
m3=mongo3
port1=27017
port2=27017
port3=27017

echo "###### Waiting for ${m1} instance startup.."
until mongosh --host ${m1} --port ${port1} --eval 'quit(db.runCommand({ ping: 1 }).ok ? 0 : 2)' &>/dev/null; do
  printf '.'
  sleep 1
done
echo "###### Working ${m1} instance found, initiating user setup & initializing rs setup.."

# setup user + pass and initialize replica sets
mongosh --host ${m1}:${port1} -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase "admin" <<EOF

var config = {
    "_id": "rs0",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "${m1}:${port1}",
            "priority": 2
        },
        {
            "_id": 2,
            "host": "${m2}:${port2}",
            "priority": 1
        },
        {
            "_id": 3,
            "host": "${m3}:${port3}",
            "priority": 1,
            "arbiterOnly": true 
        }
    ]
};
rs.initiate(config, { force: true });
rs.status();
EOF