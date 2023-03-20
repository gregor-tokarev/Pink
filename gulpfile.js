const gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del'),
    plumb = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    imgCompress = require('imagemin-jpeg-recompress'),
    babel = require('gulp-babel'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    svgstore = require('gulp-svgstore'),
    uglify = require('gulp-uglify'),
    reload = require('gulp-livereload'),
    htmlmin = require('gulp-htmlnano'),
    sourcemap = require('gulp-sourcemaps');

const isDev = false;


gulp.task('style', () => {
    if (isDev)
        return gulp.src('src/style/**/*.{sass,scss}')
            .pipe(plumb())
            .pipe(sourcemap.init())
            .pipe(sass())
            .pipe(autoprefixer({
                cascade: false,
                overrideBrowserslist: ['last 10 versions'],
            }))
            .pipe(sourcemap.write('.'))
            .pipe(gulp.dest('dist/'))
            ;
    else
        return gulp.src('src/style/**/*.{sass,scss}')
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(autoprefixer({
                cascade: false,
                overrideBrowserslist: ['last 10 versions'],
            }))
            .pipe(sourcemap.write('.'))
            .pipe(concat('style.css'))
            .pipe(gulp.dest('dist/'))
});

gulp.task('font', () => {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts/'))
});

gulp.task('script', () => {
    if (!isDev)
        return gulp.src('src/scripts/**/*.js')
            .pipe(babel())
            .pipe(concat('all.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/'));
    else
        return gulp.src('src/scripts/**/*.js')
            .pipe(sourcemap.init())
            .pipe(concat('all.js'))
            .pipe(sourcemap.write('.'))
            .pipe(gulp.dest('dist/'))


});

gulp.task('html', () => {
    if (isDev)
        return gulp.src('src/*.html')
            .pipe(gulp.dest('dist/'))
            ;
    else
        return gulp.src('src/*.html')
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('dist/'));

});

gulp.task('svg', () => {
    if (!isDev)
        return gulp.src('src/images/icons/*.svg')
            .pipe(imagemin([
                imgCompress({
                    loops: 4,
                    min: 70,
                    max: 80,
                    quality: 'high'
                }),
                imagemin.svgo()
            ]))
            .pipe(svgstore())
            .pipe(gulp.dest('dist/'));
    else
        return gulp.src('src/images/*.svg')
            .pipe(svgstore())
            .pipe(gulp.dest('dist/images/'))

});

gulp.task('img', function () {
    if (!isDev)
        return gulp.src('src/images/*.*')
            .pipe(imagemin([
                imgCompress({
                    loops: 4,
                    min: 70,
                    max: 80,
                    quality: 'high'
                }),
                imagemin.gifsicle(),
                imagemin.optipng(),
                imagemin.svgo()
            ]))
            .pipe(gulp.dest('dist/images'));
    else
        return gulp.src('src/images/**/*.*')
            .pipe(gulp.dest('dist/images/'))

});

gulp.task('build', gulp.series('html', 'style', 'script', 'img', 'font', 'svg'));

gulp.task('watchAll', () => {
    gulp.watch('src/', gulp.series('html', 'style', 'script', 'img', 'font', 'svg'))
});

gulp.task('sync', () => {
    reload.listen();

    gulp.watch('dist/*').on('change', reload.changed)
});

gulp.task('dev', gulp.parallel('watchAll', 'sync'));
