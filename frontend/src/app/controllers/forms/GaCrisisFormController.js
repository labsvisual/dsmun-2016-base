angular.module( 'app' )
       .controller( 'GaCrisisFormController', [ 'lodash', '$cookies', '$http', '$stateParams', '$window', 'RestApiService', function( _, $cookies, $http, $stateParams, $window, $rest ) {

           const isLoggedIn = $cookies.get( 'isLoggedIn' );
           let data = ( $cookies.get( 'loginData' ) );

           data = JSON.parse( data );

           const conferenceGuid = $stateParams.guid;
           this.guid = conferenceGuid;

           $rest.GetConference( {

               conferenceGuid,
               token: data.token,
               guid: data.guid,

           } ).then( ( data ) => {

               this.conferenceData = data;

           } );

           this.AddDelegate = () => {

               if( this.conferenceData.gaCrisis.delegates && this.conferenceData.gaCrisis.delegates.length === 5 ) {

                   this.isMessage = true;
                   this.messageHeader = "Warning!";
                   this.messageText = "You can not add any more delegates. The maximum number of delegates per delegation is 5.";
                   this.messageClass = {

                       'yellow': true,

                   };
                   return false;

               }

               if( this.conferenceData.gaCrisis && this.conferenceData.gaCrisis.delegates ) {

                   this.conferenceData.gaCrisis.delegates.push( {

                       name: 'Delegate Name'

                   } );

               } else {

                   this.conferenceData.gaCrisis = {
                       delegates: []
                   };

                   this.conferenceData.gaCrisis.delegates.push( {

                       name: 'Delegate Name'

                   } );

               }

           };

           this.UpdateForm = () => {

               this.processing = true;

               $rest.UpdateConference( {

                   token: data.token,
                   guid: data.guid,
                   conferenceGuid: this.guid,
                   data: this.conferenceData

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
