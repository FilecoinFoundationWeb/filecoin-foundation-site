const fs = require('fs');
const path = require('path');
const { PurgeCSS } = require('purgecss');
const postcss = require('postcss');
const minify = require('html-minifier').minify;

const isDev = /serve/.test(process.argv.join());

const processHtml = async (rawContent, outputPath, css) => {
    let content = rawContent;
    if (outputPath && outputPath.endsWith('.html')) {
        const purged = await new PurgeCSS().purge({
            content: [
                {
                    raw: rawContent,
                    extension: 'html'
                }
            ],
            css: [
                {
                    raw: await processCss()
                }
            ],
            fontFace: true,
            variables: true
        });

        content = content.replace(
            '</head>',
            `<style>${purged[0].css}</style></head>`
        );

        if (!isDev) {
            content = minify(content, {
                removeAttributeQuotes: true,
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeComments: true,
                sortClassName: true,
                sortAttributes: true,
                html5: true,
                decodeEntities: true,
                removeOptionalTags: true
            });
        }
    }
    return content;
};

const processCss = async () => {
    const fileName = 'styles.css';
    const rawFilepath = path.join(__dirname, `../_includes/css/${fileName}`);

    const css = await postcss(
        [
            require('postcss-import'),
            require('postcss-preset-env')({ stage: 1 }),
            !isDev && require('postcss-csso')
        ].filter(Boolean)
    ).process(fs.readFileSync(rawFilepath), {
        from: rawFilepath,
        map: isDev ? { inline: true } : false
    });

    return css.css;
};

module.exports = {
    initArguments: {},
    configFunction: (eleventyConfig, options = {}) => {
        eleventyConfig.addTransform('html', processHtml);
    }
};
