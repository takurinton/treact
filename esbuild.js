const { build } = require('esbuild');
const glob = require('glob');
const entryPoints = glob.sync('./src/index.ts');

build({
  entryPoints,
  outbase: './src',
  outdir: './dist',
  bundle: true,
  platform: 'node',
  external: [], 
  watch: false
})