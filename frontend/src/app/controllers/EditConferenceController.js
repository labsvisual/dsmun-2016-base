angular.module( 'app' )
       .controller( 'EditConferenceController', [ '$stateParams', '$cookies', '$http', '$state', '$window', 'RestApiService', function( $stateParams, $cookies, $http, $state, $window, $rest ) {

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

       } ] );