angular.module( 'app' )
       .controller( 'HomePageController', [ 'RestApiService', '$state', '$cookies', '$window', function( $restApi, $state, $cookies, $window ) {

           const isLoggedIn = $cookies.get( 'isLoggedIn' )
               , data       = ( $cookies.get( 'loginData' ) );

           if( isLoggedIn && data ) {
               $state.go( 'dashboard' );
           }

           const self = this;

           self.Login = () => {

               self.isProcessing = true;

               const resultPromise = $restApi.Login( self.user );
               resultPromise.then( ( dataLogin ) => {

                   self.isProcessing = false;
                   self.hasButtonMessage = true;
                   self.buttonMessage = "Redirecting to dashboard...";

                  $cookies.put( 'loginData', JSON.stringify( dataLogin ) );
                  $cookies.put( 'isLoggedIn', true );

                   if( dataLogin.role === 1 ) {


                    //    $window.location.reload();
                       $state.go( 'dashboardAdmin' );

                   } else {


                    //    $window.location.reload();
                       $state.go( 'dashboard' );

                   }


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
