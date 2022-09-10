import esbuild from 'esbuild'

// step 1: migrate to dist folder
esbuild
  .buildSync({
    entryPoints: ['./src/index.ts'],
    format: 'esm',
    sourcemap: true,
    treeShaking: true,
    bundle: true,
    minify: true,
    outfile: './dist/worker.mjs'
  })
