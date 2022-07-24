/* global require */
const esbuildSassPlugin = require('esbuild-sass-plugin');

const sassPluginConfig = esbuildSassPlugin.sassPlugin({ type: 'css' });
const inlineImage = require("esbuild-plugin-inline-image");

require('esbuild').build(
  {
    entryPoints: ['./src'],
    bundle: true,
    loader: { '.js': 'jsx', '.ts': 'tsx' },
    outfile: './dist/index.js',
    plugins: 
      [ sassPluginConfig, 
        inlineImage({
          limit: -1
        })
      ]
  }
).then(() => console.log('Build Finished!'));
