const gulp = require('gulp'); //Используем пакет gulp
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: 'dist',
        },
    });
});

gulp.task('styles', function () {
    return gulp
        .src('src/sass/*.+(scss|sass)')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(
            rename({
                prefix: '',
                suffix: '.min',
            })
        )
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/*.html').on('change', gulp.parallel('html'));
});


gulp.task('html', function () {
    return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('icons', function () {
    return gulp.src('src/icons/**/*.*')
    .pipe(gulp.dest('dist/icons/'));
});

gulp.task('mailer', function () {
    return gulp.src('src/mailer/**/*.*')
    .pipe(gulp.dest('dist/mailer/'));
});

gulp.task('images', function () {
    return gulp.src('src/img/**/*.*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 90, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest('dist/img/'));
});


gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'mailer', 'images'));


