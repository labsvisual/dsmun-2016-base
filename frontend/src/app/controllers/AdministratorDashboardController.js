angular.module( 'app' )
       .controller( 'AdministratorDashboardController', [ 'RestApiService', '$cookies', '$state', function( $rest, $cookies, $state ) {

           let isLoggedIn = $cookies.get( 'isLoggedIn' )
               , data       = ( $cookies.get( 'loginData' ) );

           if( !isLoggedIn && !data ) {
               return $state.go( 'home' );
           }

           data = JSON.parse( data );

           $rest.GetUser( data ).then( ( { school_name, teacher_escort, username } ) => {

               this.data = {

                   school_name,
                   teacher_escort,
                   username,

               };

           } );

           $rest.GetAllConferencesForAllUsers( data ).then( ( dbData ) => {

               this.allConferences = [];

               dbData.map( ( conference ) => {

                   conference.areFormsFilled = conference.registration.isFormFilled && conference.delegateInformation.isFormFilled && conference.travelArrangements.isFormFilled && conference.gaCrisis.isFormFilled;
                   this.allConferences.push( conference );

               } );

           } );

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

       } ] );
