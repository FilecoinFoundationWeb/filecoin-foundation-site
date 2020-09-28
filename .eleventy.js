const { DateTime } = require("luxon");
const { URL } = require("url");


absoluteUrl = function(url, base) {
  try {
    return (new URL(url, base)).toString()
  } catch(e) {
    return url;
  }
};

module.exports = function (eleventyConfig) {
    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
            'yyyy-LL-dd'
        );
    });
    eleventyConfig.addNunjucksFilter("absoluteUrl", (href, base) => absoluteUrl(href, base));

    eleventyConfig.addPassthroughCopy({ '_includes/static': '/' });
    return {
        templateFormats: ['md', 'njk', 'html', 'liquid', '11ty.js']
    };
};
