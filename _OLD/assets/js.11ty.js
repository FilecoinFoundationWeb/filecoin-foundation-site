const fs = require('fs');
const path = require('path');
const { build } = require('esbuild')
const tempy = require('tempy');

// the file name as an entry point for postcss compilation
// also used to define the output filename in our output /css folder.
const fileName = "script.js";

module.exports = class {
  async data () {
    const rawFilepath = path.join(__dirname, `../_includes/js/${fileName}`);
    return {
      permalink: `assets/js/${fileName}`,
      rawFilepath,
      eleventyExcludeFromCollections: true
    };
  };

  async render ({ rawFilepath }) {
    const file = tempy.file()
    await build({
      entryPoints: [rawFilepath],
      outfile: file,
      // minify: true,
      bundle: true,
      sourcemap: 'inline', // needs env setup dev/prod
    })

    return fs.readFileSync(file);
  };
}