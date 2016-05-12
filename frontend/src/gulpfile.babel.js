import gulp       from 'gulp';
import babel      from 'gulp-babel';
import concat     from 'gulp-concat';
import uglify     from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import plumber    from 'gulp-plumber';
import rename     from 'gulp-rename';

const browserSync = require('browser-sync').create();

gulp.task( 'compile', () => {

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
               .pipe( sourcemaps.write( './' ) )
               .pipe( gulp.dest( './app/dist' ) );

} );

gulp.task( 'files-watch', [ 'compile' ], () => {
    browserSync.reload();
} );

gulp.task( 'serve', [ 'compile' ], () => {

    browserSync.init( {

        server: {
            baseDir: "./"
        }

    } );

    gulp.watch( "./app/**/*.*", [ 'files-watch' ] );

} );

gulp.task( 'default', [ 'watch' ] );
