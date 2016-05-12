angular.module( 'app' )
       .controller( 'HomePageController', [ 'RestApiService', '$state', '$cookies', '$window', function( $restApi, $state, $cookies, $window ) {

           const isLoggedIn = $cookies.get( 'isLoggedIn' )
               , data       = ( $cookies.get( 'loginData' ) );

           if( isLoggedIn && data ) {
               $state.go( 'dashboard' );
           }

           const self = this;

           self.isProcessing = true;

           self.Login = () => {

               const resultPromise = $restApi.Login( self.user );
               resultPromise.then( ( dataLogin ) => {

                   self.isProcessing = false;

                   $cookies.put( 'loginData', JSON.stringify( dataLogin ) );
                   $cookies.put( 'isLoggedIn', true );

                   $window.location.reload();
                   $state.go( 'dashboard' );

               } ).catch( ( dataError ) => {

                   self.isProcessing = false;

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
