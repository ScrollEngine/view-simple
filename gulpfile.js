var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src('./public/scss/*')
    .pipe(sass({outputStyle:'compressed'}))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('concat', ['sass'], function() {
  // main css
  gulp.src([
      './public/css/normalize.css',
      './public/css/typicons.min.css',
      './public/css/main.css'
    ])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('default', ['concat']);

gulp.task('develop', ['default'], function() {
  gulp.watch([
    './public/scss/*'
  ], ['default']).on('change', function(event) {
    console.log('[watch] File %s was %s, rebuilding...', event.path, event.type);
  });
});
