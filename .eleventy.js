const { DateTime } = require('luxon');
const { URL } = require('url');

absoluteUrl = function (url, base) {
    try {
        return new URL(url, base).toString();
    } catch (e) {
        return url;
    }
};

module.exports = function (eleventyConfig) {
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
    eleventyConfig.addNunjucksFilter('absoluteUrl', (href, base) =>
        absoluteUrl(href, base)
    );

    eleventyConfig.addPassthroughCopy({ '_includes/static': '/' });
    return {
        templateFormats: ['md', 'njk', 'html', 'liquid', '11ty.js']
    };
};
