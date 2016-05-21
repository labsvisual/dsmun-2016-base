angular.module( 'app' )
        .controller( 'AdministratorDashboardController', [ 'RestApiService', '$cookies', '$state', '$window', '$scope', function( $rest, $cookies, $state, $window, $scope ) {

            let isLoggedIn = $cookies.get( 'isLoggedIn' )
               , data     = $cookies.get( 'loginData' );

            if( isLoggedIn && data ) {

               data = JSON.parse( data );

               $rest.IsValidToken( data.token ).then( ( valid ) => {

                   if( valid.valid ) {

                       if( data.role === 1 ) {

                           $state.go( 'dashboardAdmin' );

                       } else {

                           $state.go( 'dashboard' );

                       }

                   }

               } ).catch( ( err ) => {

                   $state.go( 'home' );

               } );

            }

            this.sortType = 'isConfirmed';
            this.sortReverse = false;

            this.ChangeSort = ( sortTypeNew ) => {

               if( sortTypeNew === this.sortType ) {
                   this.sortReverse = !this.sortReverse;
               } else {
                   this.sortType = sortTypeNew;
               }

            };

            this.RefreshView = () => {

                this.isProcessing = true;

                let processingOne = true
                  , processingTwo = true;

                $rest.GetAllUsers( {

                   token: data.token,

                } ).then( ( data ) => {

                    processingOne = false;
                    this.isProcessing = ( processingOne || processingTwo );

                   this.users = [];
                   data.filter( ( user ) => {

                       if( user.role !== 1 ) this.users.push( user );

                   } );

                } );

                $rest.GetAllConferencesForAllUsers( data ).then( ( dbData ) => {

                    processingTwo = false;
                    this.isProcessing = ( processingOne || processingTwo );

                   this.allConferences = [];

                   dbData.map( ( conference ) => {

                       conference.areFormsFilled = ( () => {

                           return ( conference.registration && conference.delegateInformation && conference.travelArrangements && conference.gaCrisis && conference.registration.isFormFilled && conference.delegateInformation.isFormFilled && conference.travelArrangements.isFormFilled && conference.gaCrisis.isFormFilled )

                       } )();

                       this.allConferences.push( conference );

                   } );

                } );

            };

            this.DeleteConference  = ( conferenceGuid ) => {

                this.isProcessing = true;

                $rest.DeleteConference( {

                    guid: data.guid,
                    token: data.token,
                    conferenceGuid,

                } ).then( ( res ) => {

                    this.isProcessing = false;

                    this.hasButtonMessage = true;
                    this.buttonMessage = "Conference confirmed!";
                    this.hasMessage = true;
                    this.messageClass = {
                        blue: true
                    };
                    this.messageText = "Conference confirmed!";

                    $window.location.reload();

                } ).catch( ( err ) => {

                    this.isProcessing = false;

                    this.hasMessage = true;
                    this.messageClass = {
                        red: true
                    };
                    this.messageText = "An error was encountered while executing that operation!";

                } );

            };

            this.ConfirmConference = ( guid ) => {

               this.isProcessing = true;

               $rest.ConfirmConference( {

                   guid: data.guid,
                   token: data.token,
                   conferenceGuid: guid

               } ).then( ( dbData ) => {

                   this.isProcessing = false;

                   this.hasButtonMessage = true;
                   this.buttonMessage = "Conference confirmed!";
                   this.hasMessage = true;
                   this.messageClass = {
                       blue: true
                   };
                   this.messageText = "Conference confirmed!";

                   $window.location.reload();

               } ).catch( ( err ) => {

                   this.isProcessing = false;

                   this.hasMessage = true;
                   this.messageClass = {
                       red: true
                   };
                   this.messageText = "An error was encountered while executing that operation!";

               } );

            };

            this.UnconfirmConference = ( guid ) => {

               this.isProcessing = true;

               $rest.UnconfirmConference( {

                   guid: data.guid,
                   token: data.token,
                   conferenceGuid: guid

               } ).then( ( dbData ) => {

                   this.isProcessing = false;

                   this.hasButtonMessage = true;
                   this.buttonMessage = "Conference unconfirmed!";
                   this.hasMessage = true;
                   this.messageClass = {
                       blue: true
                   };
                   this.messageText = "Conference unconfirmed!";

                   $window.location.reload();


               } ).catch( ( err ) => {

                   this.isProcessing = false;

                   this.hasMessage = true;
                   this.messageClass = {
                       red: true
                   };
                   this.messageText = "An error was encountered while executing that operation!";

               } );

            };

            this.RefreshView();

       } ] );
