angular.module( 'app' )
        .controller( 'EditConferenceAdminController', [ '$stateParams', '$cookies', '$http', '$state', '$window', 'RestApiService', 'lodash', function( $stateParams, $cookies, $http, $state, $window, $rest, _ ) {

            let isLoggedIn = $cookies.get( 'isLoggedIn' )
               , data      = $cookies.get( 'loginData' );

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
            this.schoolGuid = $stateParams.schoolGuid;

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

            this.GetAllotments = ( committee ) => {

                if( !this.conferenceData.countryAllotment || !this.conferenceData.countryAllotment.allotments ) {
                    return [];
                }

                let retVal = [];

                this.conferenceData.countryAllotment.allotments.map( ( allotment ) => {

                    if( committee === allotment.name ) {

                        retVal.push( allotment );

                    }

                } );

                return retVal;

            };

            this.AddCountryAllotment = () => {

               if( this.conferenceData.countryAllotment && this.conferenceData.countryAllotment.allotments && this.conferenceData.countryAllotment.allotments.length === 5 ) {

                   this.isMessage = true;
                   this.messageHeader = "Warning!";
                   this.messageText = "You can not add any more delegates. The maximum number of delegates per delegation is 5.";
                   this.messageClass = {

                       'yellow': true,

                   };

                   return false;

               }

               this.conferenceData.countryAllotment = ( () => {

                   return (

                       ( this.conferenceData.countryAllotment ) ? ( ( this.conferenceData.countryAllotment.allotments ) ? this.conferenceData.countryAllotment : { allotments: [] } ) : { allotments: [] }

                   )

               } )();

               this.conferenceData.countryAllotment.allotments.push( {

                   name: '',
                   country: ''

               } );

            };

            this.PostNotification = () => {

                this.isProcessing = true;
                this.notification.guid = $stateParams.schoolGuid;

                const postData =  {

                    guid: data.guid,
                    token: data.token,
                    data: this.notification

                };

                $rest.PostNewNotification( postData ).then( ( data ) => {

                    this.isProcessing = false;

                    this.isMessage = true;
                    this.messageHeader = "Success!";
                    this.messageText = "A notification was successfully sent to the respective school.";
                    this.messageClass = {

                        'green': true,

                    };

                    this.notification = {};

                } ).catch( ( err ) => {

                    this.isProcessing = false;

                    this.isMessage = true;
                    this.messageHeader = "Error!";
                    this.messageText = "There was an error in sending the notification.";
                    this.messageClass = {

                        'red': true,

                    };

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

               this.conferenceData.gaCrisis = ( () => {

                   return (

                       ( this.conferenceData.gaCrisis ) ? ( ( this.conferenceData.gaCrisis.delegates ) ? this.conferenceData.gaCrisis : { delegates: [] } ) : { delegates: [] }

                   )

               } )();

               this.conferenceData.gaCrisis.delegates.push( {

                   name: 'Delegate Name'

               } );

            };

            this.AddDelegate = () => {

            //    if( this.conferenceData.delegateInformation && this.conferenceData.delegateInformation.delegates && this.conferenceData.delegateInformation.delegates.length === 17 ) {
               //
            //        this.isMessage = true;
            //        this.messageHeader = "Warning!";
            //        this.messageText = "You can not add any more delegates. The maximum number of delegates per delegation is 17.";
            //        this.messageClass = {
               //
            //            'yellow': true,
               //
            //        };
               //
            //        return false;
               //
            //    }

               this.conferenceData.delegateInformation = ( () => {

                   return (

                       ( this.conferenceData.delegateInformation ) ? ( ( this.conferenceData.delegateInformation.delegates ) ? this.conferenceData.delegateInformation : { delegates: [] } ) : { delegates: [] }

                   )

               } )();

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
