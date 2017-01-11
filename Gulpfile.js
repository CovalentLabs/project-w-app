var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('styles', function() {
    gulp.src([
      '!./src/public/**',
      './src/**/*.scss',
    ])
        .pipe(sass({
          includePaths: [
            root("src/@app/style"),
          ]
        }).on('error', sass.logError))
        .pipe(gulp.dest('./src/'))
})

gulp.task('default', ['styles'], function() {
  gulp.watch('./src/**/*.scss',['styles'])
})

// Helper functions
var path = require('path')
function root(args) {
  args = Array.prototype.slice.call(arguments, 0)
  return path.join.apply(path, [__dirname].concat(args))
}
