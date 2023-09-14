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
  const loaders = {}

  readdirSync('./public/').forEach(file => {
    const ext_name = path.extname(file)
    entries.push({ in: file, out: path.basename(file, ext_name) })
    if (ext_name === '.png') {
      loaders[ext_name] = 'file'
    } else loaders[ext_name] = 'copy'
  })

  return { entries, loaders }
}

const { entries, loaders } = getEntryPoints()

const baseconf = {
  entryPoints: entries,
  loader: loaders,
  bundle: true,
  color: true,
  format: 'esm',
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
  metafile: true,
  plugins: [...baseconf.plugins, compressPlugin(), cleanPlugin([outdir])],
}

export const statsconf = {
  ...prodconf,
  plugins: [...baseconf.plugins, statsPlugin(outdir)],
}
