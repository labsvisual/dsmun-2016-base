angular
    .module( 'app' )
    .factory( 'RestApiService', [ '$http', 'CryptoService', '$q', ( $http, $cryptoService, $q ) => {

        // const apiUrl = 'http://api.app.beta.dsmun.com';
        // const apiUrl = 'http://localhost:3345';

        const apiUrl = '{{@API_URL}}';

        return {

            IsValidToken( token ) {

                const promise = $q.defer();

                $http.get( `${ apiUrl }/auth/token/valid/${ token }` ).then( ( data ) => {

                    promise.resolve( data.data.data );

                } ).catch( ( data ) => {

                    promise.reject( {

                        valid: false,

                    } );

                } );

                return promise.promise;

            },

            Login( userObject ) {

                const dataObject = {}
                    , promise    = $q.defer();

                dataObject.username = userObject.username;
                dataObject.password = $cryptoService.getSha512( userObject.password );

                $http.post( apiUrl + '/auth', dataObject ).then( ( data ) => {

                    if( data.status === 200 && data.data.data.token ) {

                        promise.resolve( {

                            token: data.data.data.token,
                            guid : data.data.data.guid,
                            role : data.data.data.role

                        } );

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            loggedIn: false

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        loggedIn: false

                    } );

                } );

                return promise.promise;

            },

            ForgotPassword( userObject ) {

                const dataObject = {}
                    , promise    = $q.defer();

                dataObject.username = userObject.username;

                $http.post( apiUrl + '/forgot', dataObject ).then( ( data ) => {

                    if( data.status === 200 ) {

                        promise.resolve();

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            error: true

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        error: true

                    } );

                } );

                return promise.promise;

            },

            GetUser( data ) {

                const promise    = $q.defer();

                $http.get( `${ apiUrl }/users/${ data.guid }?token=${ data.token }` ).then( ( data ) => {

                    if( data.status === 200 && data.data.data ) {

                        promise.resolve( data.data.data[ 0 ] );

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            error: true

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        error: true

                    } );

                } );

                return promise.promise;

            },

            GetAllConferences( data ) {

                const promise    = $q.defer();

                $http.get( `${ apiUrl }/conferences?guid=${ data.guid }&token=${ data.token }` ).then( ( data ) => {

                    if( data.status === 200 && data.data.data ) {

                        promise.resolve( data.data.data );

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            error: true

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        error: true

                    } );

                } );

                return promise.promise;

            },

            GetAllConferencesForAllUsers( data ) {

                const promise    = $q.defer();

                $http.get( `${ apiUrl }/conferences/all?guid=${ data.guid }&token=${ data.token }` ).then( ( data ) => {

                    if( data.status === 200 && data.data.data ) {

                        promise.resolve( data.data.data );

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            error: true

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        error: true

                    } );

                } );

                return promise.promise;

            },

            GetUnconfirmedCount( data ) {

                const promise    = $q.defer();

                $http.get( `${ apiUrl }/conferences/unconfirmed/count?guid=${ data.guid }&token=${ data.token }` ).then( ( data ) => {

                    if( data.status === 200 && data.data.data ) {

                        promise.resolve( {
                            data: data.data.data
                        } );

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            error: true

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        error: true

                    } );

                } );

                return promise.promise;

            },

            GetUnconfirmedConferences( data ) {

                const promise    = $q.defer();

                $http.get( `${ apiUrl }/conferences/unconfirmed/all?guid=${ data.guid }&token=${ data.token }` ).then( ( data ) => {

                    if( data.status === 200 && data.data.data ) {

                        promise.resolve( {
                            data: data.data.data
                        } );

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            error: true

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        error: true

                    } );

                } );

                return promise.promise;

            },

            GetConference( dataIn ) {

                const promise    = $q.defer();

                $http.get( `${ apiUrl }/conferences/${ dataIn.conferenceGuid }?token=${ dataIn.token }&guid=${ dataIn.guid }` ).then( ( data ) => {

                    if( data.status === 200 && data.data.data ) {

                        promise.resolve( data.data.data[ 0 ] );

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            error: true

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        error: true

                    } );

                } );

                return promise.promise;

            },

            Logout( dataIn ) {

                const promise = $q.defer();

                $http.post( apiUrl + '/deauth', {

                    guid: dataIn.guid,
                    token: dataIn.token,

                } ).then( ( data ) => {

                    if( data.status === 200 ) {

                        promise.resolve( {

                            statusCode: 200

                        } );

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            error: true

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        error: true

                    } );

                } );

                return promise.promise;

            },

            GetStates( country ) {

                const promise    = $q.defer();

                $http.get( `${ apiUrl }/metadata/states/${ country }` ).then( ( data ) => {

                    if( data.status === 200 && data.data.data ) {

                        promise.resolve( data.data.data );

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            error: true

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        error: true

                    } );

                } );

                return promise.promise;

            },

            CreateConference( confUserObject ) {

                const promise = $q.defer();

                const dataObject = {

                    token: confUserObject.token,
                    guid: confUserObject.guid,
                    data: {

                        registration: confUserObject.registration,

                    }

                };

                $http.post( apiUrl + '/conferences', dataObject ).then( ( data ) => {

                    if( data.status === 200 ) {

                        promise.resolve( {

                            data: data.data,

                        } );

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            error: true

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        error: true

                    } );

                } );

                return promise.promise;

            },

            CreateUser( confUserObject ) {

                const promise = $q.defer();

                const dataObject = {

                    token: confUserObject.token,
                    data: confUserObject.data,
                    hash: confUserObject.hash

                };

                $http.post( apiUrl + '/users', dataObject ).then( ( data ) => {

                    if( data.status === 200 ) {

                        promise.resolve( {

                            data: data.data,

                        } );

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            error: true

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        error: true

                    } );

                } );

                return promise.promise;

            },

            UpdateConference( confUserObject ) {

                const promise = $q.defer();

                const dataObject = {

                    token: confUserObject.token,
                    guid: confUserObject.guid,
                    data: confUserObject.data

                };

                $http.put( apiUrl + '/conferences/' + confUserObject.conferenceGuid, dataObject ).then( ( data ) => {

                    if( data.status === 200 ) {

                        promise.resolve( {

                            data: data.data,

                        } );

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            error: true

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        error: true

                    } );

                } );

                return promise.promise;

            },

            ConfirmConference( confUserObject ) {

                const promise = $q.defer();

                const dataObject = {

                    token: confUserObject.token,
                    guid: confUserObject.guid,

                };

                $http.post( apiUrl + '/conferences/confirm/' + confUserObject.conferenceGuid, dataObject ).then( ( data ) => {

                    if( data.status === 200 && data.data.data.confirmationId ) {

                        promise.resolve( {

                            data: data.data,

                        } );

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            error: true

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        error: true

                    } );

                } );

                return promise.promise;

            },

            UnconfirmConference( confUserObject ) {

                const promise = $q.defer();

                const dataObject = {

                    token: confUserObject.token,
                    guid: confUserObject.guid,
                    data: {
                        isConfirmed: false,
                        confirmationId: '',
                    }

                };

                $http.put( apiUrl + '/conferences/' + confUserObject.conferenceGuid, dataObject ).then( ( data ) => {

                    if( data.status === 200 ) {

                        promise.resolve( {

                            data: data.data,

                        } );

                    } else {

                        promise.reject( {

                            message: data.data.message,
                            error: true

                        } );

                    }

                } ).catch( ( data ) => {

                    promise.reject( {

                        message: data.data.message,
                        error: true

                    } );

                } );

                return promise.promise;

            },

        };

    } ] );
