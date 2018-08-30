var gulp = require('gulp');
var stylus = require('gulp-stylus');
var pug = require('gulp-pug');
var composer = require('gulp-uglify/composer');
var uglifyjs = require('uglify-es');
var concat = require('gulp-concat');
var clean = require('gulp-clean-dest');
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

gulp.task('default', ['pug', 'uglify', 'static', 'stylus']);

gulp.task('watch', () => {
    gulp.watch(src + 'styl/**/*.styl', ['stylus']);
    gulp.watch(src + '**/*.pug', ['pug']);
    gulp.watch(src + 'js/**/*.js', ['uglify']);
    gulp.watch(src + 'static/**/*', ['static']);
});

gulp.task('clean', () => {
    return del(dest + '**/*');
});

gulp.task('browser-reload', () => {
    browserSync.reload();
});

gulp.task('serve', ['default'], () => {
    browserSync({
        server: {
            baseDir: dest
        }
    });

    gulp.watch(src + 'styl/**/*.styl', ['stylus', 'browser-reload']);
    gulp.watch(src + '**/*.pug', ['pug', 'browser-reload']);
    gulp.watch(src + 'js/**/*.js', ['uglify', 'browser-reload']);
    gulp.watch(src + 'static/**/*', ['static', 'browser-reload']);
})