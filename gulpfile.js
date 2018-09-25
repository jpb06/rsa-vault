/// <binding BeforeBuild='clean' AfterBuild='generatePackage, moveReadme' Clean='clean' />
const gulp = require('gulp');
const rimraf = require('rimraf');
const fs = require('fs');

gulp.task('generatePackage', () => {
    const package = JSON.parse(fs.readFileSync('./package.json').toString());

    let distPackage = {
        name: package.name,
        version: package.version,
        description: package.version,
        main: package.main,
        types: package.types,
        author: package.author,
        dependencies: package.dependencies
    };

    fs.writeFile('./dist/package.json', JSON.stringify(distPackage, null, 2), 'utf8', (err) => {
        if (err) console.log('Error while writing dist package.json file:', err);
    });
});

gulp.task('moveReadme', () => {
    fs.unlink('./dist/README.md', function (err) {
        if (err === null || (err && err.code === 'ENOENT')) {
            fs.createReadStream('./README.md').pipe(fs.createWriteStream('./dist/README.md'));
        } else if (err) {
            console.error('Error while moving readme:', err);
        }
    });
});

gulp.task('clean', () => {
    rimraf('./dist', (err) => {
        console.log('Error during clean:', err);
    });
});