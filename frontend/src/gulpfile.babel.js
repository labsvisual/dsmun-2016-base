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

    return gulp.src( [ './app/**/*.js', '!./app/dist/*.*', '!app/services/ExceptionLoggingService.js' ] )
               .pipe( plumber() )
               .pipe( sourcemaps.init() )
               .pipe( babel({
                   presets: [ 'es2015' ]
               }) )
               .pipe( concat( 'app.min.js' ) )
            //    .pipe( uglify( {
            //         compress: {
            //             negate_iife: false
            //         },
            //         outSourceMaps: true
            //     } ) )
               .pipe( replace( '{{@API_URL}}', 'http://localhost:3345' ) )
               .pipe( sourcemaps.write( './' ) )
               .pipe( gulp.dest( './app/dist' ) );

} );

gulp.task( 'compile:production', () => {

    return gulp.src( [ './app/**/*.js', '!./app/dist/*.*', '!app/services/ExceptionLoggingService.js' ] )
               .pipe( plumber() )
               .pipe( concat( 'app.min.js' ) )
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
               .pipe( replace( '{{@API_URL}}', 'http://api.app.beta.dsmun.com' ) )
               .pipe( sourcemaps.write( './' ) )
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
