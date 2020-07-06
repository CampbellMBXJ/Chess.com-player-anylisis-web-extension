'use strict';

var gulp = require('gulp');
var zip = require('gulp-zip');

var files = ['src/*', 'src/assets/*', 'src/css/*'];
var xpiName = 'ccpa.xpi';

gulp.task('default', function () {
  return gulp.src(files)
    .pipe(zip(xpiName))
    .pipe(gulp.dest('./build'));
});
