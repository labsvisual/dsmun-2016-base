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

};

export default methods;
