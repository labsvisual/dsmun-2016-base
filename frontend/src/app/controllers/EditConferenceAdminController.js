angular.module( 'app' )
       .controller( 'EditConferenceAdminController', [ '$stateParams', '$cookies', '$http', '$state', '$window', 'RestApiService', function( $stateParams, $cookies, $http, $state, $window, $rest ) {

           const isLoggedIn = $cookies.get( 'isLoggedIn' );
           let data = ( $cookies.get( 'loginData' ) );

           data = JSON.parse( data );

           const conferenceGuid = $stateParams.guid;

           this.guid = conferenceGuid;

           this.ConfirmConference = ( guid ) => {

               this.isProcessing = true;

               $rest.ConfirmConference( {

                   guid: data.guid,
                   token: data.token,
                   conferenceGuid: guid

               } ).then( ( dbData ) => {

                   this.isProcessing = false;

                   this.hasMessage = true;
                   this.messageClass = {
                       blue: true
                   };
                   this.messageText = "Conference confirmed!";


               } ).catch( ( err ) => {

                   this.isProcessing = false;

                   this.hasMessage = true;
                   this.messageClass = {
                       red: true
                   };
                   this.messageText = "An error was encountered while executing that operation!";

               } );

           };

           this.AddDelegate = () => {

               if( this.conferenceData.delegateInformation && this.conferenceData.delegateInformation.delegates && this.conferenceData.delegateInformation.delegates.length === 17 ) {

                   this.isMessage = true;
                   this.messageHeader = "Warning!";
                   this.messageText = "You can not add any more delegates. The maximum number of delegates per delegation is 17.";
                   this.messageClass = {

                       'yellow': true,

                   };
                   return false;

               }

               if( this.conferenceData.delegateInformation ) {

                   this.conferenceData.delegateInformation.delegates = this.conferenceData.delegateInformation.delegates || [];

                   this.conferenceData.delegateInformation.delegates.push( {

                       name: 'Delegate Name'

                   } );

               } else {

                   this.conferenceData.delegateInformation = {};

                   this.conferenceData.delegateInformation = {
                       delegates: []
                   };

                   this.conferenceData.delegateInformation.delegates.push( {

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

           this.AddGADelegate = () => {

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

           $rest.GetConference( {

               conferenceGuid,
               token: data.token,
               guid: data.guid,

           } ).then( ( dataDb ) => {

               this.conferenceData = dataDb;

               this.isConferenceConfirmed = this.conferenceData.isConfirmed;
               this.areFormsFilled = ( () => {

                   return ( this.conferenceData.registration && this.conferenceData.delegateInformation && this.conferenceData.travelArrangements && this.conferenceData.gaCrisis && this.conferenceData.registration.isFormFilled && this.conferenceData.delegateInformation.isFormFilled && this.conferenceData.travelArrangements.isFormFilled && this.conferenceData.gaCrisis.isFormFilled )

               } )();

           } );

       } ] );
