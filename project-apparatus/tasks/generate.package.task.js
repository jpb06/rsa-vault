const fs = require('fs-extra');

const consoleUtil = require('./../util/console.util.js');

cleanDist = async function () {
    consoleUtil.printHeader('Generating package.json ...');
    
    const package = await fs.readJson('./package.json');

    let distPackage = {
        name: package.name,
        version: package.version,
        description: package.version,
        main: package.main,
        types: package.types,
        author: package.author,
        dependencies: package.dependencies
    };

    await fs.writeJson('./dist/package.json', distPackage, {
        spaces: '\t',
        EOL: '\n'
    });

    console.log('Done.');
};

module.exports = cleanDist;
