angular.module( 'app' )
       .controller( 'NewConferenceController', [ '$cookies', '$http', '$state', '$window', 'RestApiService', function( $cookies, $http, $state, $window, $rest ) {

           const isLoggedIn = $cookies.get( 'isLoggedIn' );
           let data = ( $cookies.get( 'loginData' ) );

           const self = this;

           data = JSON.parse( data );

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
