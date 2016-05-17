import gulp       from 'gulp';
import babel      from 'gulp-babel';
import concat     from 'gulp-concat';
import uglify     from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import plumber    from 'gulp-plumber';
import rename     from 'gulp-rename';

const replace     = require( 'gulp-replace' );

const browserSync = require('browser-sync').create();

gulp.task( 'compile:development', () => {

    return gulp.src( [ './app/**/*.js', '!./app/dist/*.*', '!app/services/LoggingService.js' ] )
               .pipe( plumber() )
               .pipe( sourcemaps.init() )
               .pipe( babel({
                   presets: [ 'es2015' ]
               }) )
               .pipe( concat( 'app.min.js' ) )
               .pipe( replace( '{{@API_URL}}', 'http://localhost:3345' ) )
               .pipe( sourcemaps.write( './' ) )
               .pipe( gulp.dest( './app/dist' ) );

} );

gulp.task( 'compile:production', () => {

    return gulp.src( [ './app/**/*.js', '!./app/dist/*.*', '!app/services/LoggingService.js' ] )
               .pipe( plumber() )
               .pipe( concat( 'app.min.js' ) )
               .pipe( replace( '{{@API_URL}}', 'http://api.app.beta.dsmun.com' ) )
               .pipe( sourcemaps.init() )
               .pipe( babel({
                   presets: [ 'es2015' ]
               }) )
               .pipe( uglify( {
                    compress: {
                        negate_iife: false
                    },
                    outSourceMaps: true
                } ) )
               .pipe( sourcemaps.write( './' ) )
               .pipe( gulp.dest( './app/dist' ) );

} );

gulp.task( 'prepare:production', [ 'compile:production' ], () => {

    return gulp.src( [ 'lib/jquery/dist/jquery.js', 'lib/semantic/dist/semantic.js',
                       'lib/angular/angular.js', 'lib/angular-cookies/angular-cookies.js',
                       'lib/angular-ui-router/release/angular-ui-router.js', 'lib/ng-lodash/build/ng-lodash.js',
                       'lib/stacktrace-js/dist/stacktrace.concat.js' ] )
               .pipe( plumber() )
               .pipe( concat( 'vendor.js' ) )
               .pipe( uglify( {
                    compress: {
                        negate_iife: false
                    },
                } ) )
               .pipe( gulp.dest( './app/dist' ) );

} );

gulp.task( 'files-watch', [ 'compile:development' ], () => {
    browserSync.reload();
} );

gulp.task( 'serve', [ 'compile:development' ], () => {

    browserSync.init( {

        server: {
            baseDir: "./"
        }

    } );

    gulp.watch( "./app/**/*.*", [ 'files-watch' ] );

} );

gulp.task( 'default', [ 'watch' ] );
