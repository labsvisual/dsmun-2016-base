angular.module( 'app' )
       .controller( 'DelegateInformationFormController', [ '$cookies', '$http', '$stateParams', '$window', 'RestApiService', function( $cookies, $http, $stateParams, $window, $rest ) {

           const guid = $stateParams.guid;
           const isLoggedIn = $cookies.get( 'isLoggedIn' );
           let data = ( $cookies.get( 'loginData' ) );

           this.guid = $stateParams.guid;

           data = JSON.parse( data );

       } ] );
