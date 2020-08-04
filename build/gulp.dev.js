const config = require('./gulp.config')
const gulp = require('gulp')
const plumber = require('gulp-plumber');
const stylus = require('gulp-stylus')
const gulpIf = require('gulp-if')
const concat = require('gulp-concat')
const notify = require('gulp-notify')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload;
const del = require('del')
const autoprefixer = require('gulp-autoprefixer')
const stylusBemSugar = require('stylus-bem-sugar');
const changed = require('gulp-changed');

const err = e => plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
const html = () => gulp
  .src(config.html.src)
  .pipe(changed(config.html.dist))
  .pipe(err())
  .pipe(gulp.dest(config.html.dist))
  .pipe(reload({ stream: true }))

const css = () => gulp
  .src(config.css.src)
  .pipe(err())
  .pipe(eval(config.css.engin)({
    use: stylusBemSugar()
  }))
  .pipe(gulpIf(f => config.css.merge && !config.css.exclude.find(v => f.relative.includes(v)), concat(config.css.mergeName || 'app.min.css')))
  .pipe(autoprefixer(config.css.autoprefixer))
  .pipe(gulp.dest(config.css.dist))
  .pipe(reload({ stream: true }))

const js = () => gulp
  .src(config.js.src)
  .pipe(changed(config.js.dist))
  .pipe(err())
  .pipe(gulp.dest(config.js.dist))
  .pipe(reload({ stream: true }))

const images = () => gulp
  .src(config.images.src)
  .pipe(changed(config.images.dist))
  .pipe(gulp.dest(config.images.dist))
  .pipe(reload({ stream: true }))

const copy = () => gulp
  .src(config.copy.src, { base: './public' })
  .pipe(changed(config.copy.dist))
  .pipe(gulp.dest(config.copy.dist))
  .pipe(reload({ stream: true }))

const remove = () => del(config.dist)

const watch = () => {
  browserSync.init({
    ui: false,
    port: 4000,
    server: {
      baseDir: config.dist,
    }, notify: true
  });
  gulp.watch(config.html.src, html)
  gulp.watch(config.css.watch, css)
  gulp.watch(config.js.src, js)
  gulp.watch(config.images.src, images)
  gulp.watch(config.copy.src, copy)
}

module.exports = function () {
  gulp.task('default', gulp.series(remove, html, css, js, images, copy, watch))
}

