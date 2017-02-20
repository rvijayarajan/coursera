var gulp 		= require('gulp'),
	jshint		= require('gulp-jshint'),
	stylish		= require('jshint-stylish'),
	minifycss	= require('gulp-minify-css'),
	uglify		= require('gulp-uglify'),
	usemin		= require('gulp-usemin'),
	rev			= require('gulp-rev'),
	imagemin	= require('gulp-imagemin'),
	cache		= require('gulp-cache'),
	notify		= require('gulp-notify'),
	rename		= require('gulp-rename'),
	concat		= require('gulp-concat'),
	changed		= require('gulp-changed'),
	browserSync	= require('browser-sync'),
	del			= require('del'),
	ngannotate 	= require('gulp-ng-annotate');

gulp.task('jshint', function() {
	return gulp.src('app/scripts/**/*.js')
		   .pipe(jshint())
		   .pipe(jshint.reporter(stylish));
});

gulp.task('usemin', ['jshint'], function() {
	return gulp.src(['./app/menu.html'])
		   .pipe(usemin({
		   		css: [minifycss(), rev()],
		   		js: [ngannotate(), uglify(), rev()]
		   }))
		   .pipe(gulp.dest('dist/'));
});

gulp.task('imagemin', function() {
	return del(['dist/images']),
		   gulp.src('app/images/**/*')
		   .pipe(cache(imagemin({
		   		optimizationLevel: 3,
		   		progressive: true,
		   		interlaced: true
		   })))
		   .pipe(gulp.dest('dist/images'))
		   .pipe(notify({ message: 'Images Task Complete' }));
});

gulp.task('copyfonts', ['clean'], function() {
	gulp.src('./bower-components/font-awesome/fonts/**/*.{ttf, woff, eof, svg}*')
		.pipe(gulp.dest('./dist/fonts'));

	gulp.src('./bower-components/bootstrap/dist/fonts/**/*.{ttf, woff, eof, svg}*')
		.pipe(gulp.dest('./dist/fonts'));
});

gulp.task('clean', function() {
	return del(['dist']);
});

gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);
      // Watch image files
  gulp.watch('app/images/**/*', ['imagemin']);

});

gulp.task('browser-sync', ['default'], function () {
   var files = [
      'app/**/*.html',
      'app/styles/**/*.css',
      'app/images/**/*.png',
      'app/scripts/**/*.js',
      'dist/**/*'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "dist",
         index: "menu.html"
      }
   });
        // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);
});

gulp.task('default', ['clean'], function() {
	gulp.start('usemin', 'imagemin', 'copyfonts');
});