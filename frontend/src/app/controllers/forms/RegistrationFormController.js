angular.module( 'app' )
        .controller( 'RegistrationFormController', [ '$cookies', '$http', '$stateParams', '$window', 'RestApiService', function( $cookies, $http, $stateParams, $window, $rest ) {

            const guid = $stateParams.guid;

            let isLoggedIn = $cookies.get( 'isLoggedIn' )
               , data     = $cookies.get( 'loginData' );

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

            this.guid = $stateParams.guid;

            $rest.GetConference( {

               token: data.token,
               guid: data.guid,
               conferenceGuid: guid

            } ).then( ( data ) => {

               this.conference = data;

            } );

            this.UpdateForm = () => {

               this.processing = true;

               $rest.UpdateConference( {

                   token: data.token,
                   guid: data.guid,
                   conferenceGuid: guid,
                   data: this.conference

               } ).then( ( dataIn ) => {

                   if( dataIn.data.statusCode === 200 ) {

                       this.processing = false;

                       this.isMessage = true;
                       this.messageHeader = "Successful!";
                       this.messageText = "All the details were successfully updated!";
                       this.messageClass = {

                           'blue': true,

                       };

                   }

               } );

            };

       } ] );
