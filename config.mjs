import path from 'node:path'
import cleanPlugin from './tools/plugins/clean.mjs'
import compressPlugin from './tools/plugins/compress.mjs'
import devPlugin from './tools/plugins/dev.mjs'
import statsPlugin from './tools/plugins/stats.mjs'
import { readdirSync } from './tools/utils.mjs'

export const outdir = './dist'
export const serveport = 3000
export const devport = 5000

function getEntryPoints() {
  const entries = [{ in: './src/client.tsx', out: 'index' }]

  readdirSync('./public/').forEach(file => {
    const ext_name = path.extname(file)
    entries.push({ in: file, out: path.basename(file, ext_name) })
  })

  return entries
}

const entries = getEntryPoints()

const baseconf = {
  entryPoints: entries,
  loader: { '.png': 'file', '.html': 'copy' },
  bundle: true,
  color: true,
  target: 'es2015',
  format: 'esm',
  splitting: true,
  plugins: [],
}

export const devconf = {
  ...baseconf,
  outdir: './dist_dev',
  logLevel: 'debug',
  minify: false,
  plugins: [...baseconf.plugins, devPlugin()],
}

export const prodconf = {
  ...baseconf,
  outdir: outdir,
  minify: true,
  logLevel: 'info',
  metafile: true, // for compress
  plugins: [...baseconf.plugins, compressPlugin(), cleanPlugin([outdir])],
}

export const statsconf = {
  ...prodconf,
  metafile: true,
  plugins: [...prodconf.plugins, statsPlugin(outdir)],
}
