#!/usr/bin/env bash -ex
if which n >/dev/null; then
  n 10.15.1
else
  echo 'n does not exist'
fi
npm install
npm run-script build --prod
tar czf dist.tar.gz dist
