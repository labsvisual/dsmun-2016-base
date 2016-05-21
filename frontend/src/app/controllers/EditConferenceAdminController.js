angular.module( 'app' )
        .controller( 'EditConferenceAdminController', [ '$stateParams', '$cookies', '$http', '$state', '$window', 'RestApiService', function( $stateParams, $cookies, $http, $state, $window, $rest ) {

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

            this.AddCountryAllotment = () => {

               if( this.conferenceData.countryAllotment && this.conferenceData.countryAllotment.countries && this.conferenceData.countryAllotment.countries.length === 5 ) {

                   this.isMessage = true;
                   this.messageHeader = "Warning!";
                   this.messageText = "You can not add any more delegates. The maximum number of delegates per delegation is 5.";
                   this.messageClass = {

                       'yellow': true,

                   };

                   return false;

               }

               this.conferenceData.countryAllotment = this.conferenceData.countryAllotment || {
                   countries: []
               };

               this.conferenceData.countryAllotment.countries.push( {

                   name: 'Country Name'

               } );

            };

            this.AddAnnouncement = () => {

                this.conferenceData.announcements = this.conferenceData.announcements || {
                    notifications: []
                };

                this.conferenceData.announcements.notifications.push( {

                    text: 'Notification',
                    name: 'New Notification'

                } );

            };

            this.AddGADelegate = () => {

               if( this.conferenceData.gaCrisis && this.conferenceData.gaCrisis.delegates && this.conferenceData.gaCrisis.delegates.length === 7 ) {

                   this.isMessage = true;
                   this.messageHeader = "Warning!";
                   this.messageText = "You can not add any more delegates. The maximum number of delegates per delegation is 7.";
                   this.messageClass = {

                       'yellow': true,

                   };

                   return false;

               }

               this.conferenceData.gaCrisis = this.conferenceData.gaCrisis || {
                   delegates: []
               };

               this.conferenceData.gaCrisis.delegates.push( {

                   name: 'Delegate Name'

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

               this.conferenceData.delegateInformation = this.conferenceData.delegateInformation || {
                   delegates: []
               };

               this.conferenceData.delegateInformation.delegates.push( {

                   name: 'Delegate Name'

               } );

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

            this.RefreshView = () => {

                this.isReloading = true;

                $rest.GetConference( {

                   conferenceGuid,
                   token: data.token,
                   guid: data.guid,

                } ).then( ( dataDb ) => {

                   this.conferenceData = dataDb;
                   this.isReloading = false;

                   this.fieldClasses = {

                       'two fields': ( this.conferenceData.countryAllotment ),
                       'field': ( !this.conferenceData.countryAllotment )

                   };

                   if( this.conferenceData.travelArrangements ) {

                       if( this.conferenceData.travelArrangements.onward ) {

                           if( this.conferenceData.travelArrangements.onward.arrivalDate ) {
                               this.conferenceData.travelArrangements.onward.arrivalDate = new Date( this.conferenceData.travelArrangements.onward.arrivalDate );
                           }

                           if( this.conferenceData.travelArrangements.onward.departureDate ) {
                               this.conferenceData.travelArrangements.onward.departureDate = new Date( this.conferenceData.travelArrangements.onward.departureDate );
                           }

                       }

                       if( this.conferenceData.travelArrangements.returnJourney ) {

                           if( this.conferenceData.travelArrangements.returnJourney.arrivalDate ) {
                               this.conferenceData.travelArrangements.returnJourney.arrivalDate = new Date( this.conferenceData.travelArrangements.returnJourney.arrivalDate );
                           }

                           if( this.conferenceData.travelArrangements.returnJourney.departureDate ) {
                               this.conferenceData.travelArrangements.returnJourney.departureDate = new Date( this.conferenceData.travelArrangements.returnJourney.departureDate );
                           }

                       }

                   }

                   this.isConferenceConfirmed = this.conferenceData.isConfirmed;
                   this.areFormsFilled = ( () => {

                       return ( this.conferenceData.registration && this.conferenceData.delegateInformation && this.conferenceData.travelArrangements && this.conferenceData.gaCrisis && this.conferenceData.registration.isFormFilled && this.conferenceData.delegateInformation.isFormFilled && this.conferenceData.travelArrangements.isFormFilled && this.conferenceData.gaCrisis.isFormFilled )

                   } )();

                } );

            };

            this.RefreshView();

       } ] );
