const config = require('./gulp.config')
const gulp = require('gulp')
const plumber = require('gulp-plumber');
const stylus = require('gulp-stylus')
const gulpIf = require('gulp-if')
const concat = require('gulp-concat')
const notify = require('gulp-notify')
const del = require('del')
const cleanCss = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer')

const err = e => plumber({errorHandler: notify.onError('Error: <%= error.message %>')})
const html = () => gulp
  .src(config.html.src)
  .pipe(err())
  .pipe(gulp.dest(config.html.dist))

const css = () => gulp
  .src(config.css.src)
  // .pipe(err())
  .pipe(eval(config.css.engin)())
  .pipe(gulpIf(f => config.css.merge && !config.css.exclude.find(v => f.relative.includes(v)), concat(config.css.mergeName || 'app.min.css')))
  .pipe(autoprefixer(config.css.autoprefixer))
  .pipe(gulpIf(f => !config.css.exclude.find(v => f.relative.includes(v)), cleanCss()))
  .pipe(gulp.dest(config.css.dist))

const js = () => gulp
  .src(config.js.src)
  .pipe(err())
  .pipe(babel({
      presets: ['@babel/preset-env'],
      // plugins: ["@babel/plugin-transform-runtime","es6-promise"]
  }))
  .pipe(gulpIf(f => config.js.compress && !config.js.exclude.find(v => f.relative.includes(v)), uglify()))
  .pipe(gulp.dest(config.js.dist))

const images = () => gulp
  .src(config.images.src)
  .pipe(gulp.dest(config.images.dist))

const copy = () => gulp
  .src(config.copy.src, {base: config.src})
  .pipe(gulp.dest(config.copy.dist))

const remove = () => del(config.dist)

module.exports = function () {
    gulp.task('default', gulp.series(remove, html, css, js, images, copy))
}

