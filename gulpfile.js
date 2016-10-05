// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));

  gulp.src('./views/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//minify new images
gulp.task('imagemin', function() {
	var imgSrc1 = './img/**/*',
	    imgSrc2 = './views/images/**/*',
		imgDst1 = './build/img';
		imgDst2 = './build/views/images';

	gulp.src(imgSrc1)
		.pipe(changed(imgDst1))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst1));

	gulp.src(imgSrc2)
		.pipe(changed(imgDst2))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst2));
});

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc1 = './*.html',
      htmlSrc2 = './views/*.html',
      htmlDst1 = './build',
      htmlDst2 = './build/views';

  gulp.src(htmlSrc1)
    .pipe(changed(htmlDst1))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst1));

  gulp.src(htmlSrc2)
    .pipe(changed(htmlDst2))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst2));
});

//JS concat, strip debugging and minify
gulp.task('scripts', function() {
	gulp.src('./js/*.js')
		.pipe(concat('script.js'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'));

	gulp.src('./views/js/*.js')
		.pipe(concat('script.js'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest('./build/views/js'));
});

//CSS concat, auto-prefix and minify
gulp.task('styles', function() {
	gulp.src(['./css/*.css'])
	.pipe(concat('styles.css'))
	.pipe(autoprefix('last 2 versions'))
	.pipe(minifyCSS())
	.pipe(gulp.dest('./build/css'));

	gulp.src(['./views/css/*.css'])
	.pipe(concat('styles.css'))
	.pipe(autoprefix('last 2 versions'))
	.pipe(minifyCSS())
	.pipe(gulp.dest('./build/views/css'));
});

//default gulp task
gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles'], function() {
	//watch for HTML changes in views
	gulp.watch('./views/*.html', function() {
		gulp.run('htmlpage');
	});

	//watch for JS changes
	gulp.watch('./views/js/*.js', function() {
		gulp.run('jshint', 'scripts');
	});

	//watch for CSS changes
	gulp.watch('./views/css/*.css', function() {
		gulp.run('styles');
	});
});

//change










