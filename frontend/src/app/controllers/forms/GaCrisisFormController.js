angular.module( 'app' )
       .controller( 'GaCrisisFormController', [ 'lodash', '$cookies', '$http', '$stateParams', '$window', 'RestApiService', function( _, $cookies, $http, $stateParams, $window, $rest ) {

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

           $rest.GetConference( {

               conferenceGuid,
               token: data.token,
               guid: data.guid,

           } ).then( ( data ) => {

               this.conferenceData = data;
               this.UpdateView();

           } );

           this.RemoveDelegate = ( index ) => {

               if( this.conferenceData.gaCrisis && this.conferenceData.gaCrisis.delegates && this.conferenceData.gaCrisis.delegates.length <= 0 ) {

                   this.isMessage = true;
                   this.messageHeader = "Warning!";
                   this.messageText = "You can not remove any more delegates.";
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

               this.conferenceData.gaCrisis.delegates.splice( index, 1 );
               this.UpdateView();

           };

           this.UpdateView = () => {

               this.shouldShowNoDelegatesMessage = ( () => {

                   if( this.conferenceData.gaCrisis ) {

                       if( this.conferenceData.gaCrisis.delegates ) {

                           return ( this.conferenceData.gaCrisis.delegates.length === 0 );

                       } else { return false; }

                   } else { return false; }

               } )();

           };

           this.AddDelegate = () => {

               if( this.conferenceData.gaCrisis && this.conferenceData.gaCrisis.delegates && this.conferenceData.gaCrisis.delegates.length >= 7 ) {

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

               this.UpdateView();

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
