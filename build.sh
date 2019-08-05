#!/bin/bash -ex
echo "Ejecutando con usuario: $USER y grupo: $GROUPS"

npm install
npm run-script build --prod
tar czf dist.tar.gz dist
