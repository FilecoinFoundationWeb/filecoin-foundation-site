/*
 *
 * 📦 [Module] GenerateIPFS404
 *
 */

// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
// ///////////////////////////////////////////////////////////////////// General
import Path from 'path'
import Fs from 'fs'
import Klaw from 'klaw'

// ------------------------------------------------------------------------ walk
const walk = (dir, ext) => {
  return new Promise((next) => {
    const matches = []
    Klaw(dir)
      .on('data', ({ path }) => {
        if (path && !path.includes('node_modules') && path.endsWith(ext)) {
          matches.push(path)
        }
      })
      .on('end', () => {
        next(matches)
      })
  })
}

// ------------------------------------------------------------ saveGenerated404
const saveGenerated404 = async (generateRoot, generate404Path) => {
  const htmlFiles = await walk(generateRoot, generate404Path)
  if (htmlFiles.length) {
    const sourcePath = htmlFiles[0]
    const sourceContents = Fs.readFileSync(sourcePath, 'utf8', (err, data) => {
      if (err) throw err;
      return data;
    })
    Fs.writeFileSync(`${generateRoot}/ipfs-404.html`, sourceContents, (err) => {
      if (err) throw err;
    })
  }
}

// -------------------------------------------------------------------- addHooks
const addHooks = async (instance) => {
  instance.nuxt.hook('generate:done', async () => {
    const { dir: generateRoot, fallback: generate404Path } = instance.options.generate
    await saveGenerated404(generateRoot, `/${generate404Path}`)
  })
}

// ////////////////////////////////////////////////////////////////// Initialize
// -----------------------------------------------------------------------------
function GenerateIPFS404 () {
  if (process.server) {
    console.log(`📦 [Module] GenerateIPFS404`)
  }
  if (process.env.NODE_ENV !== 'development') {
    addHooks(this)
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default GenerateIPFS404
