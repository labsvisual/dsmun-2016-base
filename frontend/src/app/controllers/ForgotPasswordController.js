angular.module( 'app' )
        .controller( 'ForgotPasswordController', [ 'RestApiService', '$state', '$cookies', '$window', function( $restApi, $state, $cookies, $window ) {

            this.Execute = () => {

               this.processing = true;

               const resultPromise = $restApi.ForgotPassword( this.user );

               resultPromise.then( ( dataForgot ) => {

                   this.processing = false;

                   self.hasMessage = true;
                   self.messageText = "An email outling the steps to reset your password has been sent. Check your email!";
                   self.messageClass = {

                       blue: true

                   };

               } ).catch( ( dataError ) => {

                   this.processing = false;

                   if( dataError.error ) {

                       self.hasMessage = true;
                       self.messageText = dataError.message;
                       self.messageClass = {
                           red: true
                       }

                   }

               } );

            }

       } ] );
