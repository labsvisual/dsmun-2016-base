angular.module( 'app' )
        .controller( 'NewUserController', [ '$cookies', '$http', '$state', '$window', 'RestApiService', 'CryptoService', function( $cookies, $http, $state, $window, $rest, $crypto ) {

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

            const self = this;

            this.NewUser = () => {

               this.processing = true;

               const hash = $crypto.getHmac( ( this.user.username + this.user.email ), data.guid );

               const dataObject = {

                   token: data.token,
                   guid: data.guid,
                   hash,
                   data: this.user

               };

               $rest.CreateUser( dataObject ).then( ( data ) => {

                    if( data.data.statusCode === 200 ) {

                        this.processing = false;
                        this.isMessage = true;
                        this.messageClass = {
                            blue: true
                        };
                        this.messageHeader = "User Added";
                        this.messageText = `The user ${ this.user.username } was successfully created.`;

                    } else {

                        this.processing = false;
                        this.isMessage = true;
                        this.messageClass = {
                            red: true
                        };
                        this.messageHeader = "An error was encountered";
                        this.messageText = data.message;

                    }

               } ).catch( ( data ) => {

                   this.processing = false;
                   this.isMessage = true;
                   this.messageClass = {
                       red: true
                   };
                   this.messageHeader = "An error was encountered";
                   console.log( data );
                   this.messageText = data.message;

               } );

            };

       } ] );
