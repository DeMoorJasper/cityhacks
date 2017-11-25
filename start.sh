#!/bin/bash
npm install
npm update
pm2 start ./bin/index.js --watch --name="cityhacks-pitstop"
