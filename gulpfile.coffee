# gulp guide: http://vincent.is/introducing-people-to-gulp/

gulp = require 'gulp'
gutil = require 'gulp-util'

sass = require 'gulp-sass'
browserSync = require 'browser-sync'
coffeelint = require 'gulp-coffeelint'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
clean = require 'gulp-clean'
runSequence = require 'run-sequence'

isProd = gutil.env.type is 'prod'

sources =
  sass: 'sass/**/*.scss'
  html: 'index.html'
  coffee: 'coffee/**/*.coffee'

destinations =
  css: 'app/css'
  html: 'app/'
  js: 'app/js'


# Reloads the page for us
gulp.task 'browser-sync', ->
    browserSync(
      open: false
      server:
        baseDir: "./app"
      watchOptions:
        debounceDelay: 1000
    )

gulp.task 'style', ->
  gulp.src(sources.sass) # we defined that at the top of the file
  .pipe(sass({outputStyle: 'compressed', errLogToConsole: true}))
  .pipe(gulp.dest(destinations.css))

gulp.task 'html', ->
  gulp.src(sources.html)
  .pipe(gulp.dest(destinations.html))

gulp.task 'src', ->
  gulp.src(sources.coffee)
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(concat('app.js'))
  .pipe(if isProd then uglify() else gutil.noop())
  .pipe(gulp.dest(destinations.js))

gulp.task 'watch', ->
  gulp.watch sources.sass, ['style']
  gulp.watch sources.app, ['lint', 'src', 'html']
  gulp.watch sources.html, ['html']

  # And we reload our page if something changed in the output folder
  gulp.watch 'app/**/**', (file) ->
    browserSync.reload(file.path) if file.type is "changed"

gulp.task 'clean', ->
  gulp.src(['app/'], {read: false}).pipe(clean())

gulp.task 'build', ->
  runSequence 'clean', ['style', 'src', 'html']

gulp.task 'default', ['build', 'browser-sync','watch']
