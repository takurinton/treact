const { build } = require('esbuild');
const glob = require('glob');
const main = glob.sync('./src/treact/index.ts');
// const example = glob.sync('./playground/example/app.ts');
// const todo = glob.sync('./playground/todo/app.ts');

build({
  entryPoints: [main], 
  outbase: './playground',
  // outdir: './dist',
  outfile: 'index.js',
  bundle: true,
  platform: 'node',
  external: [], 
  watch: false
})