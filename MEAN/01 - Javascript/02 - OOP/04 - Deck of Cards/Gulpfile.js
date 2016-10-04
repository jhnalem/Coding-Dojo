var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var cssnano      = require('gulp-cssnano');
var useref       = require('gulp-useref');
var uglify       = require('gulp-uglify');
var browserSync  = require('browser-sync').create();
var gulpIf       = require('gulp-if');
var cache        = require('gulp-cache');
var del          = require('del');
var runSequence  = require('run-sequence');
var plumber      = require('gulp-plumber');

/*
 * Development Tasks
 */

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        open: false,
        notify: false
    });
})

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
        outputStyle: 'compressed'
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
})

// Watchers
gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
})


/**
 *Optimization Tasks
 */

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

    return gulp.src('app/*.html')
        .pipe(useref())
        // .pipe(gulpIf('*.js', uglify()))
        // .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

// Copying fonts
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

// Cleaning
gulp.task('cache:clear', function() {
    return cache.clearAll(cb);
});

gulp.task('clean:dist', function() {
    return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});


/**
 *Build Sequences
 */

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
});

gulp.task('build', function(callback) {
    runSequence(
        'clean:dist',
        'sass',
        ['useref', 'fonts'],
        callback
    )
});
