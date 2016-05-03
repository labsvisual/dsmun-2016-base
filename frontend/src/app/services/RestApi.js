angular
    .module( 'app' )
    .factory( 'RestApiService', [ '$http', 'CryptoService', '$q', ( $http, $cryptoService, $q ) => {

        const apiUrl = 'http://api.base.dsmun.com:3345'

        return {

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

        };

    } ] );
