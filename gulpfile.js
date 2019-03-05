/// <binding BeforeBuild='clean' AfterBuild='generate-package, move-readme' Clean='clean' />
const gulp = require('gulp');

const generatePackage = require('./project-apparatus/tasks/generate.package.task.js');
const cleanDist = require('./project-apparatus/tasks/clean.dist.task.js');
const moveReadme = require('./project-apparatus/tasks/move.readme.task.js');

gulp.task('generate-package', async () => {
    await generatePackage();
});

gulp.task('move-readme', async () => {
    await moveReadme();
});

gulp.task('clean', async () => {
    await cleanDist();
});