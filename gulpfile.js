const gulp = require('gulp')
// const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

// Uglify and Concat All JS Files
gulp.task('concat-js', function() {
	gulp.src(['src/js/*.js'])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js'));
})

// Concat login page javascript files 
// gulp.task('concatLoginJs', function() {
// 	gulp.src(['public/js/login-page/*.js'])
// 		.pipe(concat('loginMain.js'))
// 		.pipe(gulp.dest('dist/js/login/'));
// })

//==
gulp.task('default', ['concat-js'])

// Watchers
gulp.task('watch', function() {
	gulp.watch('src/js/*.js', ['concat-js']);
	// gulp.watch('public/js/front-end/*.js', ['concat']);
	// gulp.watch('public/js/css-objects/*.js', ['concat']);
	// gulp.watch('public/js/controllers/apps/*.js', ['concat']);
	// gulp.watch('public/js/login-page/*.js',['concatLoginJs']);
	// gulp.watch('public/js/directives/*.js',['concat']);
	// gulp.watch('public/html/*.html', ['copyHtml']);
})