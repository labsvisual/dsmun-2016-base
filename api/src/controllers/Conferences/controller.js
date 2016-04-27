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

                ResponseBuilder( 200, "Done!", null, reply );

            } );


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

            } );

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
                conferenceId: confId

            } ).then( ( conferences ) => {

                ResponseBuilder( 200, null, conferences, reply );

            } );

        } );

    },

    updateConference( request, reply ) {

        const token = request.payload.token
            , guid  = request.payload.guid
            , data  = request.payload.data
            , conferenceId = request.params.conferenceId;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            ConferenceModel.findOne( {
                conferenceId,
            }, ( err, conference ) => {

                if( !err ) {
                    if( !conference ) {

                        conference = new ConferenceSchema();
                        conference = _.assign( conference, data );

                    }

                    conference.save( ( err ) => {

                        if( !err ) {

                            console.log("conference " + conference.phone + " created at " + conference.createdAt + " updated at " + conference.updatedAt);
                            ResponseBuilder( 200, "Done!", null, reply );

                        }

                        else {

                            console.log("Error: could not save conference " + conference.conferenceId);

                        }

                    } );

                }

            } );

        } );

    },

};

export default handlers;
