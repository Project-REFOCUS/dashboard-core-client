/* global require */
const { createBuildConfig } = require('./options');

require('esbuild').build(createBuildConfig(false))
    .then(() => console.log('Build Finished!'));
