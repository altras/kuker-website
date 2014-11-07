'use strict';

var gulp = require('gulp');
var del = require('del');

// Load plugins
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var path = require('path');
var reactify = require('reactify');

gulp.task('styles', function () {
  gulp.src('app/styles/main.less')
    .pipe($.less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('dist/styles'));
});
// Styles
// gulp.task('styles', function () {
//     return gulp.src('app/styles/main.css')
//         .pipe(gulp.dest('dist/styles'))
//         .pipe($.size());
// });

// Scripts
gulp.task('scripts', function () {
    var b = browserify();
    b.transform(reactify);
    b.add('./app/scripts/app.js');
    return b.bundle()
            .pipe(source('app.js'))
            .pipe(gulp.dest('dist/scripts'))
});

// HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});


// Clean
gulp.task('clean', function (cb) {
    del(['dist/'], cb);
});

// Bundle
gulp.task('bundle', ['styles', 'scripts'], function(){
    return gulp.src('./app/*.html')
               .pipe($.useref.assets())
               .pipe($.useref.restore())
               .pipe($.useref())
               .pipe(gulp.dest('dist'));
});

// Build
gulp.task('build', ['html', 'bundle', 'images', 'json']);

// Default task
gulp.task('default', ['clean', 'build']);

// Webserver
gulp.task('serve', function () {
    gulp.src('dist')
        .pipe($.webserver({
            livereload: true,
            port: 9000
        }));
});

gulp.task('json', function() {
    gulp.src('app/scripts/json/*.json')
        .pipe(gulp.dest('dist/json/'));
});


// Watch
gulp.task('watch', ['build', 'serve'], function () {

    // Watch .json files
    gulp.watch('app/scripts/**/*.json', ['json']);

    // Watch .html files
    gulp.watch('app/*.html', ['html']);

    // Watch .scss files
    gulp.watch('app/styles/**/*.less', ['styles']);

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);
});
