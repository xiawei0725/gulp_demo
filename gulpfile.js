const { src, dest, watch, series } = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const del = require('del')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const cleanCSS = require('gulp-clean-css')


function serve(cb) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
  cb()
}



// 处理js 压缩混淆
function js(cb) {
  src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
  cb()
}

// 清理dist
function clean(cb) {
  del.sync('dist')
  cb()
}


// 处理css
function css(cb) {
  src(['src/css/**/*.scss', 'src/css/**/*.css'])
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      cascade: false,
      remove: true
    }))
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
  cb()
}



function watcher(cb) {
  watch('src/js/**/*.js', js)
  watch(['src/css/**/*.scss', 'src/css/**/*.css'], css)
  cb()
}


exports.js = js
exports.clean = clean
exports.css = css

exports.default = series([
  clean,
  js,
  css,
  serve,
  watcher
])