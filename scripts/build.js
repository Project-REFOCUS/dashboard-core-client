/* global require */
const esbuildSassPlugin = require('esbuild-sass-plugin');
const sassPluginConfig = esbuildSassPlugin.sassPlugin({ type: 'css' });

require('esbuild').build({
    entryPoints: ['./src/main'],
    bundle: true,
    loader: { '.js': 'jsx', '.ts': 'tsx' },
    outfile: './dist/index.js',
    plugins: [sassPluginConfig]
}).then(() => console.log('Build Finished!'));
