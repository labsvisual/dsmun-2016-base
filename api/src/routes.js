import glob    from 'glob';
import path    from 'path';
import Helpers from './helpers/utils';

require( 'console.table' );

const allRoutePaths     = glob.sync( path.join( __dirname, './', 'controllers', '**', 'routes.js' ) )
    , routeContainers   = [];


allRoutePaths.forEach( routePath => {

    routeContainers.push( require( routePath ).default );

} );

const attachRoutes = ( serverInstance ) => {

    let attachedRoutes = [];

    routeContainers.forEach( ( routeArray, index ) => {

        routeArray.forEach( ( route ) => {

            let currentController = allRoutePaths[ index ].replace( '/routes.js', '' );
                currentController = currentController.substring( currentController.lastIndexOf( '/' ) + 1 );


            route = Helpers.prefixRoute( route, currentController );
            serverInstance.route( route );

            attachedRoutes.push( {

                method: route.method,
                path: route.path,
                controller: currentController

            } );

        } );

    } );

    console.table( attachedRoutes );

};

export default attachRoutes;
