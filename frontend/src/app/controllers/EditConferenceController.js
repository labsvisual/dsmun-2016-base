angular.module( 'app' )
        .controller( 'EditConferenceController', [ '$stateParams', '$cookies', '$http', '$state', '$window', 'RestApiService', function( $stateParams, $cookies, $http, $state, $window, $rest ) {

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

            $rest.GetNotifications( {

                guid: data.guid,
                token: data.token

            } ).then( data => {

                this.notifications = data;

            } );

            $rest.GetConference( {

               conferenceGuid,
               token: data.token,
               guid: data.guid,

            } ).then( ( data ) => {

               this.conferenceData = data;

               this.isAllDone = ( () => {

                   return ( this.conferenceData.registration && this.conferenceData.delegateInformation && this.conferenceData.travelArrangements && this.conferenceData.gaCrisis && this.conferenceData.registration.isFormFilled && this.conferenceData.delegateInformation.isFormFilled && this.conferenceData.travelArrangements.isFormFilled && this.conferenceData.gaCrisis.isFormFilled )

               } )();

            } );

            this.MarkAsViewed = ( notificationId ) => {

                $rest.MarkAsViewed( {

                    notificationId,
                    guid: data.guid,
                    token: data.token

                } ).then( ( data ) => {

                    const elem = angular.element( `#${ notificationId }` ).closest( '.message' );
                    elem.addClass( 'successfully-saved' ).addClass( 'hide-opacity' );

                } ).catch( ( err ) => {

                    alert( 'An error was encountered. Please try again later.' );

                } );

            };

       } ] );
