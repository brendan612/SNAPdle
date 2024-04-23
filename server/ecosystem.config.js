/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const packageJson = require('./package.json');

module.exports = {
  apps: [
    {
      name: 'beacon',
      script: 'lib/index.js', // Your entry point
      instances: 1,
      autorestart: true, // THIS is the important part, this will tell PM2 to restart your app if it falls over
      max_memory_restart: '2G',
      env: {
        npm_package_version: packageJson.version,
      },
    },
  ],
};
