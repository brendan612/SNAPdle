/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const packageJson = require('./package.json');

module.exports = {
  apps: [
    {
      name: 'beacon',
      script: 'lib/index.js',
      instances: 1,
      autorestart: true,
      max_memory_restart: '2G',
      env: {
        npm_package_version: packageJson.version,
      },
    },
  ],
};
