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
        open: false,
        notify: false
    });

    gulp.watch("*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("*.js").on('change', browserSync.reload);
});


// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('*.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'serve']);
