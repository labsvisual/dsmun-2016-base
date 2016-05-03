angular.module( 'app' )
       .controller( 'RegistrationFormController', [ '$cookies', '$http', '$stateParams', '$window', 'RestApiService', function( $cookies, $http, $stateParams, $window, $rest ) {

           const guid = $stateParams.guid;
           const isLoggedIn = $cookies.get( 'isLoggedIn' );
           let data = ( $cookies.get( 'loginData' ) );

           this.guid = $stateParams.guid;

           data = JSON.parse( data );

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
