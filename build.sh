#!/bin/bash -ex
echo "Ejecutando con usuario: $USER y grupo: $GROUPS"

if which /var/lib/jenkins/n/bin/n > /dev/null; then
  n 10.15.3
else
  echo 'n does not exist'
fi

npm install
npm run-script build --prod
tar czf dist.tar.gz dist
