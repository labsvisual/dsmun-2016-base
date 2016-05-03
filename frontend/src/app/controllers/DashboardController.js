angular.module( 'app' )
       .controller( 'DashboardController', [ 'RestApiService', '$cookies', '$state', function( $rest, $cookies, $state ) {

           let isLoggedIn = $cookies.get( 'isLoggedIn' )
               , data       = ( $cookies.get( 'loginData' ) );

           if( !isLoggedIn && !data ) {
               return $state.go( 'home' );
           }

           data = JSON.parse( data );

           let dataPromise = $rest.GetUser( data );
           dataPromise.then( ( dataOut ) => {

               this.data = dataOut;


           } ).catch( ( data ) => {

               console.log( 'Error Encountered' );

           } );

           dataPromise = $rest.GetAllConferences( data );
           dataPromise.then( ( dataIn ) => {

               this.hasConferences = ( dataIn.length !== 0 );
               this.conferences = {
                   count: dataIn.length,
                   data: dataIn
               };

           } ).catch( ( data ) => {

               console.log( 'Error Encountered' );

           } );


       } ] );
