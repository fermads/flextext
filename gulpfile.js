var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var version = require('./package.json').version;

gulp.task('default', function() {
  gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(rename('flextext-'+ version +'.min.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('git', function() {
  gulp.src('**')
    .pipe(gulp.dest('../../../Git/FlexText'));
});