const fs = require('fs-extra');

const consoleUtil = require('./../util/console.util.js');

cleanDist = async function () {
    consoleUtil.printHeader('Cleaning dist folder ...');

    await fs.emptyDir('./dist');

    console.log('Done.');
};

module.exports = cleanDist;
