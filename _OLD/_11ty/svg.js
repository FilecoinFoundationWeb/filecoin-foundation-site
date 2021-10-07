const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const exists = promisify(require('fs').exists);
const readFile = promisify(require('fs').readFile);
const copyFile = promisify(require('fs').copyFile);
const writeFile = promisify(require('fs').writeFile);
const delFile = promisify(require('fs').unlink);
const SVGO = require('svgo');
const globby = require('globby');
const hasha = require('hasha');
const findRemoveSync = require('find-remove')

const deleteOld = async (name, dir) => {
    const paths = await globby(dir);
    for (const file of paths) {
        const basename = path.basename(file).split('--')[1];
        if (name === basename) {
            await delFile(file);
        }
    }
};

const cleanGen = (genDir) => {
    try {
        findRemoveSync(genDir, {
            age: { seconds: 3600 * 24 },
            files: '*.*'
        });
    } catch (err) {
        console.error(err);
    }
};

const processSvg = async ({ src }) => {
    const paths = await globby(src);
    const svgo = new SVGO();
    const genDir = path.join('_gen', src);
    const dir = path.join('_site', src);

    fs.mkdirSync(genDir, { recursive: true });
    fs.mkdirSync(dir, { recursive: true });
    cleanGen(genDir)
    return Promise.all(
        paths.map(async (file) => {
            const name = path.basename(file);
            const content = await readFile(file);
            const hash = await hasha(content, { algorithm: 'sha256' });
            const genPath = `${genDir}/${hash}--${name}`;
            const distPath = path.join(dir, name);

            if (!(await exists(genPath))) {
                console.log(`Writing ${distPath} from ./${file}`);
                await deleteOld(name, genDir);
                const result = await svgo.optimize(content, { path: file });
                await writeFile(genPath, result.data);
                await copyFile(genPath, distPath);
            } else {
                // console.log('skip');
                await copyFile(genPath, distPath);
            }
        })
    );
};

let files = [];

const svg = (config = {}) => {
    return async (content, outputPath) => {
        // Run on rebuild
        if (
            files.length > 0 &&
            files.findIndex((f) => f === outputPath) !== -1
        ) {
            files = [];
            await processSvg(config);
        }
        files.push(outputPath);
        return content;
    };
};

module.exports = {
    initArguments: {},
    configFunction: async (eleventyConfig, pluginOptions = {}) => {
        eleventyConfig.addWatchTarget(pluginOptions.src);
        eleventyConfig.addTransform('svg', svg(pluginOptions));
        // Run on build
        await processSvg(pluginOptions);
    }
};
