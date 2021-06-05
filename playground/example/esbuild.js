const { build } = require('esbuild');
const glob = require('glob');
const example = glob.sync('./app.ts');

build({
  entryPoints: [example], 
  outbase: './',
  outdir: './dist',
  bundle: true,
  platform: 'node',
  external: [], 
  watch: false
})