var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('browser-sync').create();
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

// gulp.task('browserSync', function() {
//     browserSync.init({
//         server: {
//             baseDir: 'app',
//             routes: {
//                 '/bower_components': 'bower_components'
//             },
//         },
//         port: 3000,
//         open: false,
//         notify: false,
//         ghostMode: false
//     });
// });

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
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
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch([
        'app/*.html',
        'app/**/*.html',
        'app/js/**/*.js'
    ], browserSync.reload);
});

gulp.task('default', ['sass', 'browserSync', 'watch']);
