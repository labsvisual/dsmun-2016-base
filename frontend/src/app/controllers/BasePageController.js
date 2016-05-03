angular.module( 'app' )
       .controller( 'BasePageController', [ '$cookies', '$state', '$window', 'RestApiService', function( $cookies, $state, $window, $rest ) {

            const data = $cookies.get( 'loginData' );
            this.showLogout = $cookies.get( 'isLoggedIn' ) && data;
            this.Logout = () => {

                const promise = $rest.Logout( JSON.parse( data ) );
                promise.then( ( data ) => {

                    $cookies.remove( 'isLoggedIn' );
                    $cookies.remove( 'loginData' );

                } ).catch( ( err ) => {

                    $cookies.remove( 'isLoggedIn' );
                    $cookies.remove( 'loginData' );

                } );

                this.showLogout = false;
                $window.location = "/";

            };


       } ] );
