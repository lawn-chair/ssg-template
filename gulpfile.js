/* eslint-env node */

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var pug = require('gulp-pug');
var composer = require('gulp-uglify/composer');
var uglifyjs = require('uglify-es');
var concat = require('gulp-concat');
var del = require('del');
var browserSync = require('browser-sync');
var eslint = require('gulp-eslint');

var uglify = composer(uglifyjs, console);

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
        .pipe(eslint())
        .pipe(uglify())
        .pipe(gulp.dest(dest + 'js/'));
});

gulp.task('static', () => {
    return gulp.src(src + 'static/**/*')
        .pipe(gulp.dest(dest));
});

gulp.task('default', gulp.series(['pug', 'uglify', 'static', 'stylus']));

gulp.task('watch', () => {
    gulp.watch(src + 'styl/**/*.styl', gulp.task('stylus'));
    gulp.watch(src + '**/*.pug', gulp.task('pug'));
    gulp.watch(src + 'js/**/*.js', gulp.task('uglify'));
    gulp.watch(src + 'static/**/*', gulp.task('static'));
});

gulp.task('clean', () => {
    return del(dest + '**/*');
});

gulp.task('browser-reload', () => {
    browserSync.reload();
});

gulp.task('serve', gulp.series('default', () => {
    browserSync({
        server: {
            baseDir: dest
        }
    });

    gulp.watch(src + 'styl/**/*.styl', gulp.series('stylus', 'browser-reload'));
    gulp.watch(src + '**/*.pug', gulp.series('pug', 'browser-reload'));
    gulp.watch(src + 'js/**/*.js', gulp.series('uglify', 'browser-reload'));
    gulp.watch(src + 'static/**/*', gulp.series('static', 'browser-reload'));
}))