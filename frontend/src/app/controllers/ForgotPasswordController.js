angular.module( 'app' )
        .controller( 'ForgotPasswordController', [ 'RestApiService', '$state', '$cookies', '$window', function( $restApi, $state, $cookies, $window ) {

            this.Execute = () => {

               this.processing = true;

               const resultPromise = $restApi.ForgotPassword( this.user );

               resultPromise.then( ( dataForgot ) => {

                   this.processing = false;

                   this.hasMessage = true;
                   this.messageText = "An email outling the steps to reset your password has been sent. Check your email!";
                   this.messageClass = {

                       blue: true

                   };

               } ).catch( ( dataError ) => {

                   this.processing = false;

                   if( dataError.error ) {

                       this.hasMessage = true;
                       this.messageText = dataError.message;
                       this.messageClass = {
                           red: true
                       }

                   }

               } );

            }

       } ] );
