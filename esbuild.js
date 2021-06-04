const { build } = require('esbuild');
const glob = require('glob');
const example = glob.sync('./playground/example/app.ts');
const todo = glob.sync('./playground/todo/app.ts');

build({
  entryPoints: [example, todo], 
  outbase: './playground',
  outdir: './dist',
  bundle: true,
  platform: 'node',
  external: [], 
  watch: false
})