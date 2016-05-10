angular.module( 'app' )
       .controller( 'HomePageController', [ 'RestApiService', '$state', '$cookies', '$window', function( $restApi, $state, $cookies, $window ) {

           const isLoggedIn = $cookies.get( 'isLoggedIn' )
               , data       = ( $cookies.get( 'loginData' ) );

           if( isLoggedIn && data ) {
               $state.go( 'dashboard' );
           }

           const self = this;

           self.Login = () => {

               const resultPromise = $restApi.Login( self.user );
               resultPromise.then( ( dataLogin ) => {

                   $cookies.put( 'loginData', JSON.stringify( dataLogin ) );
                   $cookies.put( 'isLoggedIn', true );

                   $window.location.reload();
                   $state.go( 'dashboard' );

               } ).catch( ( dataError ) => {

                   if( dataError.loggedIn === false ) {

                       self.hasMessage = true;
                       self.messageText = dataError.message;
                       self.messageClass = {
                           red: true
                       }

                   }

               } );

           }

       } ] );
