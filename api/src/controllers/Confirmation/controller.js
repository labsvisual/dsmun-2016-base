import ResponseBuilder from '../../response.js';
import Knex from '../../knex.js';
import * as Crypto from '../../helpers/crypto.js';
import * as RandomString from 'randomstring';
import * as Guid from 'node-uuid';
import * as Mailer from '../../helpers/mailer.js';
import Helpers from '../../helpers/utils.js';
import ConferenceModel from '../../models/models.js';
import Winston from '../../helpers/logger';

var Hasher = require( 'node-hasher' )
  , _      = require( 'lodash' );

const handlers = {

    prepareConfirmationSheet( request, reply ) {

        const confirmationId = request.params.confirmationId
            , guid  = request.params.guid;

        const checkToken = Knex( 'confirmations' ).where( {

            confirmationId,
            guid,

        } ).select( 'id' ).then( ( [ dbData ] ) => {

            if( !dbData ) {

                reply.view( 'error' );

            }

            if( dbData.role === 1 ) {

                ConferenceModel.filter( {

                    conferenceGuid: request.params.conferenceGuid,

                } ).then( ( [ conference ] ) => {

                    renderer.render(  )

                    ResponseBuilder( 200, null, conference, reply );

                } ).catch( ( err ) => {

                    Winston.log( 'error', err, {
                        type: 'api_error'
                    } );
                    ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

                } );

            } else {

                Winston.warn( `Unauthorized operation executed against GUID ${ guid }` );
                ResponseBuilder( 403, "You are unauthorised for the operation.", null, reply );

            }

        } ).catch( ( err ) => {

            Winston.log( 'error', err, {
                type: 'api_error'
            } );
            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

};

export default handlers;
