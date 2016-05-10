angular.module( 'app' )
       .controller( 'TravelArrangementsFormController', [ '$cookies', '$http', '$stateParams', '$window', 'RestApiService', function( $cookies, $http, $stateParams, $window, $rest ) {

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

               if( this.conferenceData.travelArrangements.onward.arrivalDate ) {
                   this.conferenceData.travelArrangements.onward.arrivalDate = new Date( this.conferenceData.travelArrangements.onward.arrivalDate );
               }

               if( this.conferenceData.travelArrangements.onward.departureDate ) {
                   this.conferenceData.travelArrangements.onward.departureDate = new Date( this.conferenceData.travelArrangements.onward.departureDate );
               }

               if( this.conferenceData.travelArrangements.returnJourney.arrivalDate ) {
                   this.conferenceData.travelArrangements.returnJourney.arrivalDate = new Date( this.conferenceData.travelArrangements.returnJourney.arrivalDate );
               }

               if( this.conferenceData.travelArrangements.returnJourney.departureDate ) {
                   this.conferenceData.travelArrangements.returnJourney.departureDate = new Date( this.conferenceData.travelArrangements.returnJourney.departureDate );
               }

           } );


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
