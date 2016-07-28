angular.module( 'app' )
        .controller( 'RegistrationFormController', [ '$cookies', '$http', '$stateParams', '$window', 'RestApiService', function( $cookies, $http, $stateParams, $window, $rest ) {

            const guid = $stateParams.guid;

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

            this.guid = $stateParams.guid;

            $rest.GetConference( {

               token: data.token,
               guid: data.guid,
               conferenceGuid: guid

            } ).then( ( data ) => {

               this.conferenceData = data;
               this.UpdateView();

            } );

            this.AddTeacherEscort = () => {

                if( this.conferenceData.registration && this.conferenceData.registration.teacherEscorts && this.conferenceData.registration.teacherEscorts.length >= 2 ) {

                    this.isMessage = true;
                    this.messageHeader = "Warning!";
                    this.messageText = "You can not add any more teacher escorts. The maximum number of teacher escorts per delegation is 2.";
                    this.messageClass = {

                        'yellow': true,

                    };

                    return false;

                }

                this.conferenceData.registration.teacherEscorts = this.conferenceData.registration.teacherEscorts || [];

                this.conferenceData.registration.teacherEscorts.push( {

                    name: 'Escort Name',

                } );

                this.UpdateView();

            };

            this.RemoveEscort = ( index ) => {

                if( this.conferenceData.registration && this.conferenceData.registration.teacherEscorts && this.conferenceData.registration.teacherEscorts.length <= 0 ) {

                    this.isMessage = true;
                    this.messageHeader = "Warning!";
                    this.messageText = "You can not remove any more delegates.";
                    this.messageClass = {

                        'yellow': true,

                    };

                    return false;

                }

                this.conferenceData.registration.teacherEscorts = this.conferenceData.registration.teacherEscorts || [];

                this.conferenceData.registration.teacherEscorts.splice( index, 1 );
                this.UpdateView();

            };

            this.UpdateView = () => {

                this.shouldShowNoTeacherEscortMessage = ( () => {

                    if( this.conferenceData.registration ) {

                        if( this.conferenceData.registration.teacherEscorts ) {

                            return ( this.conferenceData.registration.teacherEscorts.length === 0 );

                        } else { return false; }

                    } else { return false; }

                } )();

            };

            this.UpdateForm = () => {

               this.processing = true;

               $rest.UpdateConference( {

                   token: data.token,
                   guid: data.guid,
                   conferenceGuid: guid,
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
