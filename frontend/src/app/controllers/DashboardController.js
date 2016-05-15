angular.module( 'app' )
       .controller( 'DashboardController', [ 'RestApiService', '$cookies', '$state', function( $rest, $cookies, $state ) {

           let isLoggedIn = $cookies.get( 'isLoggedIn' )
               , data       = ( $cookies.get( 'loginData' ) );

           if( isLoggedIn && data ) {

               $rest.IsValidToken( JSON.parse( data ).token ).then( ( valid ) => {

                   if( valid.valid ) {

                       if( JSON.parse( data ).role === 1 ) {

                           $state.go( 'dashboardAdmin' );

                       } else {

                           $state.go( 'dashboard' );

                       }

                   }

               } ).catch( ( err ) => {

                   $state.go( 'home' );

               } );

           }

           data = JSON.parse( data );

           $rest.GetUnconfirmedCount( data ).then( ( dat ) => {

               this.shouldAddNewButton = dat.data.count === 0;

           } );

           let dataPromise = $rest.GetUser( data );
           dataPromise.then( ( dataOut ) => {

               this.data = dataOut;


           } ).catch( ( data ) => {

               console.error( 'The application failed to load with the provided parameters; trying to reload internal state.' );
            //    $state.go( 'home' );

           } );

           dataPromise = $rest.GetAllConferences( data );
           dataPromise.then( ( dataIn ) => {

               this.hasConferences = ( dataIn.length !== 0 );
               this.conferences = {
                   count: dataIn.length,
                   data: dataIn
               };

           } ).catch( ( data ) => {

               console.error( 'The application failed to load with the provided parameters; trying to reload internal state.' );
               $state.go( 'home' );

           } );


       } ] );
