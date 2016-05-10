import ResponseBuilder from '../../response.js';
import Knex from '../../knex.js';
import * as Crypto from '../../helpers/crypto.js';
import * as RandomString from 'randomstring';
import * as Guid from 'node-uuid';
import * as Mailer from '../../helpers/mailer.js';
import Helpers from '../../helpers/utils.js';
import ConferenceModel from '../../models/models.js';

var Hasher = require( 'node-hasher' )
  , _      = require( 'lodash' );

_.mixin( {
  compactObject: ( obj, keyName ) => {

     let clone = _.clone( obj );

     _.each( clone, ( value, key ) => {

       if( key === keyName ) {

         delete clone[ key ];

       }

     });

     return clone;

  }

} );

const handlers = {

    createConference( request, reply ) {

        const token = request.payload.token
            , guid  = request.payload.guid
            , data  = request.payload.data;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            const confGuid = Guid.v4();

            let dataToExtendWith = {

                conferenceGuid: confGuid,
                schoolGuid: guid,
                isConfirmed: false

            };

            dataToExtendWith = _.merge( data, dataToExtendWith );
            const model = new ConferenceModel( dataToExtendWith );

            model.save().then( ( doc ) => {

                ResponseBuilder( 200, "Done!", doc, reply );

            } ).catch( ( err ) => {

                console.log( err );
                ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

            } );


        } ).catch( ( err ) => {

            ResponseBuilder( 511, "An invalid token was provided.", null, reply );

        } );

    },

    getConferences( request, reply ) {

        const token = request.query.token
            , guid  = request.query.guid;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            ConferenceModel.filter( {

                schoolGuid: guid,

            } ).then( ( conferences ) => {

                ResponseBuilder( 200, null, conferences, reply );

            } ).catch( ( err ) => {

                ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

            } );

        } ).catch( ( err ) => {

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    getUnconfirmedConferences( request, reply ) {

        const token = request.query.token
            , guid  = request.query.guid;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            ConferenceModel.filter( {

                schoolGuid: guid,
                isConfirmed: false,

            } ).then( ( conferences ) => {

                ResponseBuilder( 200, null, conferences, reply );

            } ).catch( ( err ) => {

                ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

            } );

        } ).catch( ( err ) => {

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    getUnconfirmedConferencesCount( request, reply ) {

        const token = request.query.token
            , guid  = request.query.guid;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            ConferenceModel.filter( {

                schoolGuid: guid,
                isConfirmed: false,

            } ).then( ( conferences ) => {

                ResponseBuilder( 200, null, {

                    count: conferences.length,

                }, reply );

            } ).catch( ( err ) => {

                ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

            } );

        } ).catch( ( err ) => {

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    getAllConferences( request, reply ) {

        const token = request.query.token
            , guid  = request.query.guid;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid', 'role' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            if( dbData.role === 1 ) {

                ConferenceModel.then( ( conferences ) => {

                    ResponseBuilder( 200, null, conferences, reply );

                } ).catch( ( err ) => {

                    ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

                } );

            } else {

                ResponseBuilder( 403, "You are unauthorised for the operation.", null, reply );

            }

        } ).catch( ( err ) => {

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    getConference( request, reply ) {

        const token = request.query.token
            , guid  = request.query.guid
            , confId = request.params.conferenceId;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            ConferenceModel.filter( {

                schoolGuid: guid,
                conferenceGuid: confId

            } ).then( ( conferences ) => {

                ResponseBuilder( 200, null, conferences, reply );

            } ).catch( ( err ) => {

                ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

            } );

        } ).catch( ( err ) => {

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );;

    },

    updateConference( request, reply ) {

        const token = request.payload.token
            , guid  = request.payload.guid
            , conferenceId = request.params.conferenceId;


        let data  = request.payload.data;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid', 'role' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            if( ( ( Object.keys( data ).indexOf( 'isConfirmed' ) > -1 ) || Helpers.containsKey( data, 'isFormFilled' ) || Helpers.containsKey( data, 'isCommitteeConfirmed' ) ) && dbData.role !== 1 ) {

                data = _.compactObject( data, 'isConfirmed' );
                data = _.compactObject( data, 'isFormFilled' );
                data = _.compactObject( data, 'isCommitteeConfirmed' );

            }

            if( dbData.guid === guid && dbData.role === 0 ) {

                ConferenceModel.filter( {

                    conferenceGuid: conferenceId,
                    schoolGuid: guid,

                } ).update( data ).then( ( res ) => {

                    ResponseBuilder( 200, "Account details updated!", null, reply );

                } ).catch( ( err ) => {

                    ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

                } );

            } else if ( dbData.guid !== guid || dbData.role === 1 ) {

                ConferenceModel.filter( {

                    conferenceGuid: conferenceId,

                } ).update( data ).then( ( res ) => {

                    ResponseBuilder( 200, "Account details updated!", null, reply );

                } ).catch( ( err ) => {

                    ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

                } );

            }

        } ).catch( ( err ) => {

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );;

    },

};

export default handlers;
