//npm install gulp gulp-plumber gulp-sass gulp-autoprefixer browser-sync --save-dev


// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        open: false
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});


// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer())
        .pipe(plumber.stop())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'serve']);
