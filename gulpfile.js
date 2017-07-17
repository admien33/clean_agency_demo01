/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

'use strict';

// Include Gulp & tools we'll use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var cleanCSS = require('gulp-clean-css');

// Get a task path
function task(filename) {
  return './gulp/tasks/' + filename;
}



gulp.task('jsmin', function() {
  return gulp.src('gulp/JSinput/**/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('gulp/JSoutput/'));
});

gulp.task('jsmin_travis', function() {
  return gulp.src('assets-js/**/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('assets-js/'));
});

gulp.task('min-css-noncritical-site', function() {
  return gulp.src('_site/assets/non-critical.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('_site/assets/'));
});

gulp.task('imagemin', require(task('image-min'))($, gulp));
