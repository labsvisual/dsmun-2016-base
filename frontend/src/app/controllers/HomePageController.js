angular.module( 'app' )
        .controller( 'HomePageController', [ 'RestApiService', '$state', '$cookies', '$window', function( $rest, $state, $cookies, $window ) {

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

            this.Login = () => {

                this.isProcessing = true;

                const resultPromise = $rest.Login( this.user );

                resultPromise.then( ( dataLogin ) => {

                    this.hasButtonMessage = true;
                    this.buttonMessage = "Redirecting to dashboard...";

                    $cookies.put( 'loginData', JSON.stringify( dataLogin ) );
                    $cookies.put( 'isLoggedIn', true );

                    if( dataLogin.role === 1 ) {

                        $state.go( 'dashboardAdmin' );

                    } else {

                        $state.go( 'dashboard' );

                    }

                } ).catch( ( dataError ) => {

                    this.isProcessing = false;

                    if( dataError.loggedIn === false ) {

                        this.hasMessage = true;
                        this.messageText = dataError.message;
                        this.messageClass = {
                            red: true
                        }

                    }

                } );

            }

       } ] );
