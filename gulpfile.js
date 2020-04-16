const gulp = require('gulp');
const spawn = require('child_process').spawn;
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const del = require('del');
const browserSync = require('browser-sync').create();

const siteRoot = '_site';

function doSpawn(argument, cb) {
  const child = spawn('bundle exec jekyll ' + argument, { shell: true });

  child.stderr.on('data', function(data) {
    console.error('STDERR:', data.toString());
  });

  child.stdout.on('data', function(data) {
    console.log('STDOUT:', data.toString());
  });

  child.on('close', browserSync.reload).on('exit', cb);
}

gulp.task('bootstrap-scss', function() {
  return gulp
    .src('node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed',
      }).on('error', sass.logError),
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('bootstrap-js', function() {
  return gulp
    .src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/popper.js/dist/umd/popper.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('bootstrap-clean', function(done) {
  del(['assets/css/bootstrap*', 'assets/js/jquery*', 'assets/js/popper*', 'assets/js/bootstrap*']);
  done();
});

gulp.task('js', function() {
  return gulp
    .src(['assets/js/partials/**.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('js-clean', function(done) {
  del(['assets/js/main*']);
  done();
});

gulp.task('jekyll-serve', function(done) {
  doSpawn('serve', done);
});

gulp.task('jekyll-build', function(done) {
  doSpawn('build', done);
});

gulp.task('clean', function(done) {
  doSpawn('clean', done);
});

gulp.task('serve', function(done) {
  browserSync.init({
    port: 4000,
    server: {
      baseDir: siteRoot,
    },
    ui: {
      port: 4001,
    },
  });
  done();
});

gulp.task('watch', function(done) {
  gulp.watch(['_includes/*.html', '_layouts/*.html', '_posts/*.md', 'pages/*.md'], gulp.series('jekyll-build'));
  gulp.watch(['./**/*.scss'], gulp.series('jekyll-build'));
  done();
});

gulp.task('build', gulp.series('clean', 'jekyll-build'));

gulp.task('default', gulp.series('serve', 'watch'));
