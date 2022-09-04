/* global require */
const { createBuildConfig } = require('./options');
const isDevelopment = process.env.ENVIRONMENT !== 'production';
require('esbuild').build(createBuildConfig(isDevelopment))
    .then(() => console.log('Build Finished!'));
