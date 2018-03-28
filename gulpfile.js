'use strict';

//dependencies
let gulp = require('gulp');
let sass = require('gulp-sass');
let minifyCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let changed = require('gulp-changed');


// SCSS/CSS

let SCSS_SRC = './src/Assets/scss/**/*.scss';
let SCSS_DEST = './src/Assets/css';

//Compile SCSS
gulp.task('compile_scss', function(){
	gulp.src(SCSS_SRC)
	.pipe(sass().on('error', sass.logError))
	.pipe(minifyCSS())
	.pipe(rename({suffix: '.min' }))
	.pipe(changed(SCSS_DEST))
	.pipe(gulp.dest(SCSS_DEST));
});

//detect change in SCSS
gulp.task('watch_scss', function(){
	gulp.watch(SCSS_SRC, ['compile_scss']);
});

//run task
gulp.task('default', ['watch_scss']);