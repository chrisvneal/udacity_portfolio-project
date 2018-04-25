// Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// Directories
var scssFolder = 'src/scss/**/*.scss';
var cssFolder = 'dist/css';
var htmlSource = 'src/*.html';
var jsSource = 'src/js/*.js';
var jsDist = 'dist/js'
var htmlDist = 'dist';
var sourcmapFolder = './maps';

// Gulp Tasks ************************************

// convert SASS files to CSS: 'scss'
gulp.task('scss', function() {
  return gulp.src(scssFolder)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write(sourcmapFolder))
    .pipe(browserSync.stream())
});

// copy all html files to 'dist' once file saved
gulp.task('copy', function() {
  return gulp.src(htmlSource)
    .pipe(gulp.dest(htmlDist))
    .pipe(browserSync.stream())
});

// initialize browser sync for live reload
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: htmlDist
    }
  });
});

// watch html and scss files for changes
gulp.task('watch', ['copy', 'browserSync', 'scss'], function() {
  gulp.watch(scssFolder, ['scss']);
  gulp.watch(htmlSource, ['copy']);
});


// start all gulp taks by entering 'gulp' at the command line
gulp.task('default', ['watch']);