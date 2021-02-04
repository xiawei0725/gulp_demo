const { src, dest, watch, series, task } = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const del = require('del')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')

const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const stream = require('vinyl-source-stream')
const es = require('event-stream')
const fs = require('fs')
const join = require('path').join





// function test(cb) {
//   src('src/js/**/*.js')
//     .pipe(babel(
//       // {
//       //   presets: ['@babel/preset-env'],
//       //   plugins: ['@babel/plugin-transform-runtime']
//       // }
//     ))
//     .pipe(dest('./test'))
//   cb()
// }

// function browser(cb) {
//   browserify({
//     entries: './test/index.js',
//     debug: true
//   })
//     .bundle()
//     .on('error', function (error) {
//       console.log(error.toString())
//     })
//     .pipe(stream('test.js'))
//     .pipe(buffer())
//     .pipe(dest('./test/testBundle'));
//   //这一句其实是因为V4不再支持同步任务，所以需要以这种方式或者其他API中提到的方式
//   cb()
// }
// exports.test = test
// exports.build = series([test, browser])


function serve(cb) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
  cb()
}


function findSync(startPath) {
  let result = []
  function finder(path) {
    let files = fs.readdirSync(path)
    files.forEach(val => {
      let fPath = join(path, val)
      let stats = fs.statSync(fPath)
      if (stats.isDirectory()) finder(fPath)
      if (stats.isFile()) result.push({ path: './' + fPath, name: val })
    })
  }
  finder(startPath)
  let res = result.map(item => {
    item.path = item.path.replace(/\\/g, '/')
    return item
  })
  return res
}

const folder = {
  dist: 'dist/js_browser/',
  temp: 'dist/'
}


function browserProd(cb) {
  let files = findSync(folder.temp + 'js')
  var task = files.map(entry => {
    return browserify({
      entries: entry.path,
      debug: true
    })
      .bundle()
      .on('error', function (error) {
        console.log(error.toString())
      })
      .pipe(stream(entry.name))
      .pipe(buffer())
      .pipe(dest(folder.dist + 'js'))
  })
  es.merge.apply(null, task)
  cb()
}


// 处理js 压缩混淆
function js(cb) {
  src('src/js/**/*.js')
    // .pipe(sourcemaps.init())
    .pipe(babel())
    // .pipe(uglify())
    //.pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
  // .pipe(browserSync.stream());
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
    .pipe(cleanCSS({ compatibility: 'ie8' }))
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
exports.build1 = series([
  clean,
  js,
  css,
  browserProd,
])
exports.build2 = series([
  clean,
  js,
  css
])





exports.default = series([
  clean,
  js,
  css,
  serve,
  watcher
])