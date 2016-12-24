var gulp = require('gulp');
var sass= require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');

//runs sass, browserSync and watch tasks (for development)
gulp.task('default', function (callback){
	runSequence(['sass','browserSync', 'watch'],
		callback
)});
//runs sass, useref, images and font tasks (for FTP uploads)
gulp.task('build', function (callback){
	runSequence('clean:dist',
		['sass', 'useref', 'scripts', 'jsLibs', 'images', 'fonts'],
		callback
)});

// task to clean dist folder (delete old files)
gulp.task('clean:dist', function(){
	return del.sync('dist');
});
//task to optimise images + put them in dist folder
gulp.task('images', function(){
	return gulp.src('app/assets/**/*.+(png|jpg|gif|svg|mp4|ogv|ogg)')
	.pipe(cache(imagemin({
		interlaced: true
	})))
	.pipe(gulp.dest('dist/assets'))
});
//task to copy fonts to dist folder
gulp.task('fonts', function(){
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
});
//task to turn sass into css and then reload browser
gulp.task('sass', function(){
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});
// our gulp-nodemon task
gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: 'app/index.js'
	}).on('start', function () {
		//avoid nodemon being started multiple times
		console.log("server started");
		setTimeout(function(){
			browserSync.reload();
		}, 2000);
		if (!started) {
			cb();
			started = true;
		}
	})
	.on('crash', function() {
		// console.log('nodemon.crash');
	})
	.on('restart', function() {
		console.log('nodemon.restart');
		// browserSync.reload();
	})
	.once('quit', function () {
		// handle ctrl+c without a big weep
		process.exit();
	});
});

gulp.task('browserSync', ['nodemon'], function() {
	browserSync.init({
		proxy: "localhost:3000",
		port: 4000,
	});
	console.log("Browser sync is working");
});

gulp.task('distTest', function() {
	browserSync.init({
		server: {
			baseDir:'dist'
		},
	})
});

gulp.task('jsLibs', function(){
	return gulp.src('app/js/lib/*.js')
	// .pipe(concat('libraries.min.js'))
	// .pipe(uglify())
	.pipe(gulp.dest('dist/js/lib'));
});

gulp.task('scripts', function(){
	return gulp.src('app/js/*.js')
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

//task to get all js+css files referenced in html file and output all new files to dist
gulp.task('useref', function(){
	return gulp.src('app/*.html')
	.pipe(useref())
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulpIf('*.css', cssnano()))
	.pipe(gulp.dest('dist'))
});

//task that 'watches' once browser sync and sass have been run
//gulp then watches for any change in scss to activate sass task
//gulp does the same for html and any js change and updates the browser
gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('app/*.js', browserSync.reload);
});
