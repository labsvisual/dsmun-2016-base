import * as _ from 'lodash';

const methods = {

    prefixRoute( route, controllerName ) {

        controllerName = controllerName.toLowerCase();

        const path = route.path;

        if( path.lastIndexOf( '/' ) === path.length - 1 ) {

            route.path = "/" + controllerName + path.replace( '/', '' );

        } else {

            route.path = `/${ controllerName }/${ path.replace( '/', '' ) }`;

        }

        return route;

    },

    containsKey( obj, key ) {

        if ( _.has( obj, key ) )
            return [ obj ];

        return _.flatten( _.map( obj, ( v ) => {
            return typeof v == "object" ? containsKey( v, key ) : [];
        }), true );

    }

};

export default methods;
