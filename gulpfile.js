var gulp = require('gulp');
var stylus = require('gulp-stylus');
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var clean = require('gulp-clean-dest');
var del = require('del');
var browserSync = require('browser-sync');

var src = 'src/';
var dest = 'dist/';

gulp.task('stylus', () => {
    return gulp.src(src + 'styl/**/*.styl')
        .pipe(stylus())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(dest + 'css/'));
});

gulp.task('pug', () => {
    return gulp.src(src + 'pug/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest(dest));
});

gulp.task('uglify', () => {
    return gulp.src(src + 'js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(dest + 'js/'));
});

gulp.task('static', () => {
    return gulp.src(src + 'static/**/*')
        .pipe(gulp.dest(dest));
});

gulp.task('default', ['pug', 'uglify', 'static', 'stylus']);

gulp.task('watch', () => {
    gulp.watch(src + '**/*', ['default']);
});

gulp.task('clean', () => {
    return del(dest + '**/*');
});

gulp.task('browser-reload', () => {
    browserSync.reload();
});

gulp.task('serve', () => {
    browserSync({
        server: {
            baseDir: dest
        }
    });

    gulp.watch(src + 'styl/**/*.styl', ['stylus', 'browser-reload']);
    gulp.watch(src + '**/*.pug', ['pug', 'browser-reload']);
    gulp.watch(src + 'js/**/*.js', ['uglify', 'browser-reload']);
})