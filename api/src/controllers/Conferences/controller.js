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

            } ).catch( ( err ) => {

                ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

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

            } ).catch( ( err ) => {

                ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

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
                conferenceGuid: confId

            } ).then( ( conferences ) => {

                ResponseBuilder( 200, null, conferences, reply );

            } ).catch( ( err ) => {

                ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

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

        } ).select( 'guid', 'role' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            if( ( Object.keys( data ).indexOf( 'isConfirmed' ) > -1 && dbData.role !== 1 ) || ( Helpers.containsKey( data, 'isFormFilled' ) ) ) {

                ResponseBuilder( 403, "Your are not authorised to make that change.", null, reply );
                return;

            }

            ConferenceModel.filter( {

                conferenceGuid: conferenceId,
                schoolGuid: guid,

            } ).update( data ).then( ( res ) => {

                ResponseBuilder( 200, "Account details updated!", null, reply );

            } ).catch( ( err ) => {

                ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

            } );

        } );

    },

};

export default handlers;
