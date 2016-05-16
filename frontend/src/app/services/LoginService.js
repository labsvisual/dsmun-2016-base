angular
    .module( 'app' )
    .factory( 'LoginService', [ '$cookies', 'RestApiService', '$state', '$q', function( $cookies, $rest, $state, $q ) {

        return {

            checkLogin() {

                let isLoggedIn = $cookies.get( 'isLoggedIn' )
                    , data     = ( $cookies.get( 'loginData' ) )
                    , promise  = $q.defer();

                if( isLoggedIn && data ) {

                    data = JSON.parse( data );

                    $rest.IsValidToken( data.token ).then( ( valid ) => {

                        if( valid.valid ) {

                            promise.resolve( {
                                valid: true,
                                data,
                            } );

                        }

                    } ).catch( ( err ) => {

                        promise.reject( {
                            valid: true,
                        } );

                    } );

                }

                return promise.promise;

            },

            getLoginData() {

                const data = JSON.parse( $cookies.get( 'loginData' ) );
                return ( data );

            }

        };

    } ] );
