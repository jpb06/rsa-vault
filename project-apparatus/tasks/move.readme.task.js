const fs = require('fs-extra');

const consoleUtil = require('./../util/console.util.js');

cleanDist = async function () {
    consoleUtil.printHeader('Moving readme ...');

    await fs.copy('./README.md', './dist/README.md');

    console.log('Done.');
};

module.exports = cleanDist;
