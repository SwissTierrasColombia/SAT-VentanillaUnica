#! /bin/bash
if which nvm >/dev/null; then
nvm use 10.15.3
else
echo 'nvm does not exist'
fi
npm install
npm run-script build --prod
tar czf dist.tar.gz dist
