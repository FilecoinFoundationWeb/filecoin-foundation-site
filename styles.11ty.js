const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

// the file name as an entry point for postcss compilation
// also used to define the output filename in our output /css folder.
const fileName = "styles.css";

module.exports = class {
  async data () {
    const rawFilepath = path.join(__dirname, `_includes/css/${fileName}`);
    return {
      permalink: `css/${fileName}`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath),
      eleventyExcludeFromCollections: true
    };
  };

  async render ({ rawCss, rawFilepath }) {
    return await postcss([
      require('postcss-import'),
      require('postcss-preset-env')({ stage: 1 })
    ])
    .process(rawCss, { from: rawFilepath })
    .then(result => result.css);
  };
}