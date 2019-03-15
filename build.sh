#! /bin/bash
npm install
npm run-script build --prod
tar czf dist.tar.gz dist
