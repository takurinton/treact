const { build } = require('esbuild');
const glob = require('glob');
const entryPoints = glob.sync('./playground/todo/app.ts');

build({
  entryPoints,
  outbase: './playground',
  outdir: './dist',
  bundle: true,
  platform: 'node',
  external: [], 
  watch: false
})