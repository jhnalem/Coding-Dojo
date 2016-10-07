var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('browser-sync').create();
var runSequence  = require('run-sequence');
var plumber      = require('gulp-plumber');
var nodemon      = require('gulp-nodemon');

gulp.task('nodemon', function(cb) {
    var called = false;

    return nodemon({
        script: 'server.js'

    }).on('start', function() {
        if( !called ) {
            called = true;
            cb();
        }
    });
});

gulp.task('browserSync', ['nodemon'], function() {
    browserSync.init({
        proxy: {
            target: "localhost:8000",
            ws: true
        },
        port: 3000,
        open: false,
        notify: false,
        ghostMode: false
    });
});

gulp.task('sass', function() {
  return gulp.src('static/scss/**/*.scss')
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('watch', function() {
    gulp.watch('static/scss/**/*.scss', ['sass']);
    gulp.watch('views/*.html', browserSync.reload);
    gulp.watch('views/*.ejs', browserSync.reload);
    gulp.watch('static/js/**/*.js', browserSync.reload);
});

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
});
