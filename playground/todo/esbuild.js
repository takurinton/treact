const { build } = require('esbuild');
const glob = require('glob');
const todo = glob.sync('./app.ts');

build({
  entryPoints: [todo], 
  outbase: './',
  outdir: './dist',
  bundle: true,
  platform: 'node',
  external: [], 
  watch: false
})