var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve', function serve() {
  browserSync.init({
    notify: false,
    port: 8080,
    server: {
      baseDir: ['app'],
      routes: {
        '/bower_components':  'bower_components'
      }
    },
  });
  gulp.watch(['app/**/*.*'])
  .on('change', browserSync.reload);
});


gulp.task('serve-test', function serve() {
  browserSync.init({
    notify: false,
    port: 8081,
    server: {
      baseDir: ['test','app'],
      routes: {
        '/bower_components':  'bower_components'
      }
    },
  });
  gulp.watch(['app/**/*.*'])
  .on('change', browserSync.reload);
});