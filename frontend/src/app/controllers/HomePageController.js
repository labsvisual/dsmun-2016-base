angular.module( 'app' )
       .controller( 'HomePageController', [ 'RestApiService', '$state', '$cookies', '$window', function( $restApi, $state, $cookies, $window ) {

           const isLoggedIn = $cookies.get( 'isLoggedIn' );
            let  data       = ( $cookies.get( 'loginData' ) );

           if( isLoggedIn && data ) {

               data = JSON.parse( data );

               $restApi.IsValidToken( data.token ).then( ( valid ) => {

                   if( valid.valid ) {

                       if( data.role === 1 ) {

                           $state.go( 'dashboardAdmin' );

                       } else {

                           $state.go( 'dashboard' );

                       }

                   }

               } ).catch( ( err ) => {

                   $cookies.remove( 'isLoggedIn' );
                   $cookies.remove( 'loginData' );

               } );

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

                       $state.go( 'dashboardAdmin' );

                   } else {

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
