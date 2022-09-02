var gulp         = require('gulp'),
    purge            = require('gulp-css-purge'),
    concat           = require('gulp-concat'),
    sourcemaps       = require('gulp-sourcemaps'),
    notify           = require('gulp-notify'),
    rename           = require('gulp-rename'),
    uglify           = require('gulp-uglify'),
    scss             = require('gulp-sass'),
    autoprefixer     = require('gulp-autoprefixer'),
    browserSync      = require('browser-sync').create(),
    del              = require('del');


/**
 * Для зручнішої роботи оголошуємо змінні
 */
var basePath = {
    dist: 'dist/' ,
    app:  'app/',
};

var path = {
    appSass:      basePath.app  + 'sass/',
    appJs:        basePath.app  + 'js/',
    appLibs:      basePath.app  + 'libs/',
    distCss:      basePath.dist + 'css/',
    distJs:       basePath.dist + 'js/',
};

var options = {
    watchAppJs:   path.appJs   + '*.js',
    watchAppSass: path.appSass + '*.scss',
    cssAfterScss: 'style.min.css',
    mainScssFile: 'base.scss',
    jsAfterMin:   'scripts.min.js',
};



/**
 * Видалення папки dist з всім його вмістимим
 */
gulp.task('distremove', function(cb) {
    del([basePath.dist], cb);
});



/**
 * Мінімізуміємо js файли
 */
gulp.task('minJs', function () {
    gulp.src(options.watchAppJs)
        // .pipe(uglify())
        .pipe(concat(options.jsAfterMin))
        .pipe(gulp.dest(path.distJs));
});


/**
 * SASS
 */
gulp.task('sass', function() {
    gulp.src(path.appSass + options.mainScssFile)
        .pipe(sourcemaps.init())
        .pipe(scss())
        .on('error', scss.logError)
        .pipe(purge({
            special_convert_rem_font_size : false,
            trim : true,
            format : true,
            shorten : true,
            verbose : false,
        }))
        .pipe(autoprefixer({
            Browserslist: ['> 0.5%', 'last 4 versions', 'not dead'],
            cascade: false
        }))
        .pipe(rename(options.cssAfterScss))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.distCss))
        .pipe(browserSync.stream());
});


/**
 * Створюємо сервер
 */
gulp.task('serve', function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(options.watchAppSass, ['sass']);
    gulp.watch(options.watchAppJs, ['minJs']);
    gulp.watch([
          options.watchAppSass
        , options.watchAppJs
        , '*.html'
    ]).on('change', browserSync.reload);
});


gulp.task('watch', function(){
    gulp.watch(options.watchAppSass, ['sass']);
    gulp.watch(options.watchAppJs, ['minJs']);
});

// За замовчуванням: відслідковуємо
gulp.task('default', ['watch']);

