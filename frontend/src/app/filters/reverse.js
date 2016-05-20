angular
    .module( 'app' )
    .filter( 'reverse', () => {

        return ( items ) => {

            return items.slice().reverse();

        };

    } );
