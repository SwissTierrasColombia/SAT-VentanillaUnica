#!/bin/bash -ex
echo "Ejecutando con usuario: $USER y grupo: $GROUPS"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
export PATH=$HOME/local/bin:$PATH

if which nvm >/dev/null; then
  nvm use 10.15.3
else
  echo 'nvm does not exist'
fi

npm install
npm run-script build --prod
tar czf dist.tar.gz dist
