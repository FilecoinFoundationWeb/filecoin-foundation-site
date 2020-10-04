const { DateTime } = require('luxon');
const { URL } = require('url');
const { promisify } = require("util");
const fs = require("fs");
const hasha = require("hasha");
const readFile = promisify(require("fs").readFile);

const absoluteUrl = function (url, base) {
    try {
        return new URL(url, base).toString();
    } catch (e) {
        return url;
    }
};

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(require('./_11ty/svg'), {src: 'assets/svg'})
    eleventyConfig.addPlugin(require('./_11ty/html'))
    eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
    
    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
            'yyyy-LL-dd'
        );
    });
    eleventyConfig.addFilter('readableDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
            ' LLLL dd, yyyy'
        );
    });
    eleventyConfig.addNunjucksFilter('absoluteUrl', absoluteUrl);
    eleventyConfig.addNunjucksAsyncFilter("addHash", function (
        absolutePath,
        callback
      ) {
        readFile(`_site${absolutePath}`, {
          encoding: "utf-8",
        })
          .then((content) => {
            return hasha.async(content);
          })
          .then((hash) => {
            callback(null, `${absolutePath}?hash=${hash.substr(0, 10)}`);
          })
          .catch((error) => callback(error));
      });

    eleventyConfig.addPassthroughCopy({ 'static': '/' });
    return {
        templateFormats: ['md', 'njk', 'html', 'liquid', '11ty.js']
    };
};
