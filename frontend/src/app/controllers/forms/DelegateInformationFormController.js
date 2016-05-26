angular.module( 'app' )
       .controller( 'DelegateInformationFormController', [ '$cookies', '$http', '$stateParams', '$window', 'RestApiService', function( $cookies, $http, $stateParams, $window, $rest ) {

           let isLoggedIn       = $cookies.get( 'isLoggedIn' )
               , data           = $cookies.get( 'loginData' )
               , conferenceGuid = $stateParams.guid;

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

           this.guid = conferenceGuid;

           $rest.GetConference( {

               conferenceGuid,
               token: data.token,
               guid: data.guid,

           } ).then( ( data ) => {

               this.conferenceData = data;

               this.UpdateView();

               this.fieldClasses = {

                   'two fields': ( this.conferenceData.countryAllotment ),
                   'field': ( !this.conferenceData.countryAllotment )

               };

           } );

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

           this.AddDelegate = () => {

               if( this.conferenceData.delegateInformation && this.conferenceData.delegateInformation.delegates && this.conferenceData.delegateInformation.delegates.length >= 17 ) {

                   this.isMessage = true;
                   this.messageHeader = "Warning!";
                   this.messageText = "You can not add any more delegates. The maximum number of delegates per delegation is 17.";
                   this.messageClass = {

                       'yellow': true,

                   };

                   return false;

               }

               this.conferenceData.delegateInformation = ( () => {

                   return (

                       ( this.conferenceData.delegateInformation ) ? ( ( this.conferenceData.delegateInformation.delegates ) ? this.conferenceData.delegateInformation : { delegates: [] } ) : { delegates: [] }

                   )

               } )();

               this.conferenceData.delegateInformation.delegates.push( {

                   name: 'Delegate Name'

               } );

               this.UpdateView();

           };

           this.RemoveDelegate = ( index ) => {

               if( this.conferenceData.delegateInformation && this.conferenceData.delegateInformation.delegates && this.conferenceData.delegateInformation.delegates.length <= 0 ) {

                   this.isMessage = true;
                   this.messageHeader = "Warning!";
                   this.messageText = "You can not remove any more delegates.";
                   this.messageClass = {

                       'yellow': true,

                   };

                   return false;

               }

               this.conferenceData.delegateInformation = ( () => {

                   return (

                       ( this.conferenceData.delegateInformation ) ? ( ( this.conferenceData.delegateInformation.delegates ) ? this.conferenceData.delegateInformation : { delegates: [] } ) : { delegates: [] }

                   )

               } )();

               this.conferenceData.delegateInformation.delegates.splice( index, 1 );
               this.UpdateView();

           };

           this.UpdateView = () => {

               this.shouldShowNoDelegatesMessage = ( () => {

                   if( this.conferenceData.delegateInformation ) {

                       if( this.conferenceData.delegateInformation.delegates ) {

                           return ( this.conferenceData.delegateInformation.delegates.length === 0 );

                       } else { return false; }

                   } else { return false; }

               } )();

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
