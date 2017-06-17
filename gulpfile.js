'use strict';

// Load plugins
var gulp 					= require('gulp');
var sass 					= require('gulp-sass');
// var stripdebug 		= require('gulp-strip-debug');
var uglify 				= require('gulp-uglify');
var concat 				= require('gulp-concat');
var autoprefixer 	= require('gulp-autoprefixer');
// var notify 				= require('gulp-notify');
var plumber 			= require('gulp-plumber');
var gutil 				= require('gulp-util');
// var browsersync 	= require('browser-sync');

// error function for plumber
var onError = function (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
};

var sassOptions = {
	outputStyle: 'compressed'
	// outputStyle: 'compact'
};

var autoprefixerOptions = {
	browsers: ['> 0%'],
	cascade: false
};

// CSS task
gulp.task('css', function() {
	return gulp.src('./scss/*.scss')
	.pipe( plumber({ errorHandler: onError }) )
	.pipe( sass( sassOptions ) )
	.pipe( autoprefixer( autoprefixerOptions ) )
	.pipe( gulp.dest('./css/') );
	// .pipe( browsersync.reload({ stream:true }) );
	// .pipe( notify({ message: 'CSS done!' }) );
});

//Concatenate and Minify JS task
gulp.task('js', function() {
	return gulp.src([
		'./js/class/**/*.js'
	])
	.pipe( concat('main.js') )
	// .pipe( gulp.dest('../js') )
	// .pipe( stripdebug() )
	// .pipe( uglify() )
	.pipe( gulp.dest('./js') );
	// .pipe( notify({ message: 'JS done!' }) );
});

// Watch task
gulp.task('sync-watch', ['browser-sync'], function () {
	gulp.watch(['./scss/**/*'], ['css']);
	gulp.watch(['./js/**/*', '!./js/script.js'], ['js', 'browsersync-reload']);
	gulp.watch(['./**/*.php', './**/*.html', './**/*.svg', './**/*.jpg', './**/*.png'], ['browsersync-reload']);
});

gulp.task('watch', function () {
	gulp.watch(['./scss/**/*'], ['css']);
	gulp.watch(['./js/**/*', '!./js/main.js'], ['js']);
});

//tasks
gulp.task('default', ['css', 'js']);
