angular.module( 'app' )
        .controller( 'ViewUserWiseController', [ '$cookies', '$http', '$state', '$window', 'RestApiService', 'CryptoService', 'lodash', function( $cookies, $http, $state, $window, $rest, $crypto, _ ) {

            let isLoggedIn = $cookies.get( 'isLoggedIn' )
               , data      = $cookies.get( 'loginData' );

            if( isLoggedIn && data ) {

               data = JSON.parse( data );

               $rest.IsValidToken( data.token ).then( ( valid ) => {

                   if( !valid.valid ) {

                       $state.go( 'home' );

                   }

               } ).catch( ( err ) => {

                   $state.go( 'home' );

               } );

            }

            const self = this;

            

       } ] );
