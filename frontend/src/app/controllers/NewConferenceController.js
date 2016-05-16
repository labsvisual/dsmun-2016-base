angular.module( 'app' )
        .controller( 'NewConferenceController', [ '$cookies', '$http', '$state', '$window', 'RestApiService', function( $cookies, $http, $state, $window, $rest ) {

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

            this.countries = [

               {

                   code: 'IN',
                   name: 'India'

               },

               {

                   code: 'US',
                   name: 'America'

               }

            ];

            this.populateStateList = ( country ) => {

               $rest.GetStates( country ).then( ( data ) => {

                   this.states = data;

               } );

            };

            this.cancel = () => {

               $state.go( 'dashboard' );

            };

            this.NewConference = () => {

               this.processing = true;

               const dataObject = {

                   token: data.token,
                   guid: data.guid,
                   registration: {

                       name: self.conference.registration.facultyAdvisor.firstName + ' ' + self.conference.registration.facultyAdvisor.lastName,
                       address: {

                           street: self.conference.registration.address.street,
                           city: self.conference.registration.address.city,
                           pin: self.conference.registration.address.pin,
                           state: self.conference.registration.address.state,
                           country: self.conference.registration.address.country,

                       },

                       facultyAdvisor: {

                           name: self.conference.registration.facultyAdvisor.firstName + ' ' + self.conference.registration.facultyAdvisor.lastName,
                           mobileNumber: self.conference.registration.facultyAdvisor.mobile,
                           landlineNumber: self.conference.registration.facultyAdvisor.landline,
                           email: self.conference.registration.facultyAdvisor.email

                       }

                   }

               };

               $rest.CreateConference( dataObject ).then( ( data ) => {

                    if( data.data.statusCode === 200 ) {

                        this.processing = false;
                        $state.go( 'dashboard' );

                    } else {

                        this.isError = true;
                        this.errorMessage = data.data.data.message;

                    }

               } ).catch( ( data ) => {

                  this.isError = true;
                  this.errorMessage = data.message;

               } );

            };

       } ] );
