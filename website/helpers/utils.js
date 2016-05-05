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
            return true;

        const contains = _.flatten( _.map( obj, ( v ) => {
            return typeof v == "object" ? this.containsKey( v, key ) : false;
        }), true );

        return contains.indexOf( true ) > -1;

    }

};

export default methods;
