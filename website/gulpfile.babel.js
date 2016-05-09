import gulp       from 'gulp';
import concat     from 'gulp-concat';
import uglify     from 'gulp-uglify';
import plumber    from 'gulp-plumber';
import aws        from 'gulp-s3';
import rename     from 'gulp-rename';
import awsInfo    from './aws.json';

const srcJs = './views/static/style/js/**/*.js';
const srcCss = [ './views/static/style/css/*.css', './views/static/style/css/color/aqua.css' ];

gulp.task( 'build:js', () => {

    return gulp
               .src( srcJs )
               .pipe( plumber() )
               .pipe( concat( 'app.min.js' ) )
               .pipe( uglify() )
               .pipe( rename( 'app.min.js' ) )
               .pipe( gulp.dest( './views/static/style/dist' ) );

} );

gulp.task( 'build:css', () => {

    return gulp
               .src( srcCss )
               .pipe( plumber() )
               .pipe( concat( 'app.min.css' ) )
               .pipe( gulp.dest( './views/static/style/dist' ) );

} );

gulp.task( 'deploy:js', [ 'build:js' ], () => {

    return gulp
               .src( './views/static/style/dist/app.min.js' )
               .pipe( rename( 'dsmun-web-static/assets/app.min.js' ) )
               .pipe( aws( awsInfo ) );

} );

gulp.task( 'deploy:css', [ 'build:css' ], () => {

    return gulp
               .src( './views/static/style/dist/app.min.css' )
               .pipe( rename( 'dsmun-web-static/assets/app.min.css' ) )
               .pipe( aws( awsInfo ) );

} );

gulp.task( 'deploy', [ 'build:css', 'build:js' ] ,() => {

    console.log( 'Manually upload it.' );

} );

gulp.task( 'default', [ 'deploy' ] );
