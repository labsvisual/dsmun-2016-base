import ResponseBuilder from '../../response.js';
import Knex from '../../knex.js';
import * as Crypto from '../../helpers/crypto.js';
import * as RandomString from 'randomstring';
import * as Guid from 'node-uuid';
import * as Mailer from '../../helpers/mailer.js';
import Helpers from '../../helpers/utils.js';
import ConferenceModel from '../../models/models.js';
import * as Logger from '../../helpers/logger';

const Hasher = require( 'node-hasher' )
    , _      = require( 'lodash' )
    , debug  = process.env.NODE_ENV !== 'production';

const handlers = {

    confirmNotification( request, reply ) {

        const token = request.query.token
            , guid  = request.params.guid
            , notificationId = request.params.notificationId;

        const getRole = Knex( 'tokens' ).where( {

            token,
            is_revoked: false,

        } ).select( 'guid', 'role' ).then( ( [ dbData ] ) => {

            if( dbData.guid !== guid ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            const updateData = Knex( 'notifications' ).where( {

                notification_id: notificationId,
                guid,

            } ).update( {

                is_viewed: true,

            } ).then( ( id ) => {

                ResponseBuilder( 201, null, null, reply );

            } ).catch( ( err ) => {

                Logger.error( err );

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );

            } );

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );


    },

    getNotifications( request, reply ) {

        const token = request.query.token
            , guid  = request.params.guid;

        const getRole = Knex( 'tokens' ).where( {

            token,
            is_revoked: false,

        } ).select( 'guid', 'role' ).then( ( [ dbData ] ) => {

            if( dbData.guid !== guid ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            const userList = Knex( 'notifications' ).where( {

                guid,
                is_viewed: false,

            } ).select( 'notification_id', 'notification_text', 'notification_type', 'notification_title' ).then( ( data ) => {

                ResponseBuilder( 200, null, data ,reply );

            } );

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    postNotification( request, reply ) {

        const guid  = request.payload.guid
            , token = request.payload.token
            , data  = request.payload.data;

        const getRequestGuid = Knex( 'tokens' ).where( {

            token,
            is_revoked: false,

        } ).select( 'guid', 'role' ).then( ( [ dbData ] ) => {

            if( dbData.role !== 1 ) {

                ResponseBuilder( 511, "The provided user does not have the privileges to execute that operation.", null, reply );
                return;

            }

            const notificationId = RandomString.generate( 16 );

            const getUserData = Knex( 'users' ).where( {

                guid: data.guid,

            } ).select( 'email', 'teacher_escort' ).then( ( [ dbData ] ) => {

                let insertObject = {

                    notification_id: notificationId,
                    notification_text: data.notificationText,
                    notification_title: data.notificationTitle,
                    guid: data.guid,
                    notification_type: data.notificationType,

                };

                const insertIntoTable = Knex( 'notifications' ).insert( insertObject ).then( ( id ) => {

                    const message = `

                    <p>
                    Hey ${ dbData.teacher_escort }
                    </p>

                    <p>
                    A notification related to this account was posted in DSMUN base.
                    </p>

                    <p>
                    <b>Notification: </b>"${ data.notificationText }"
                    </p>

                    <p>
                    --<br>
                    Th DSMUN Team.
                    </p>
                    `;

                    const msg = Mailer.buildMessage( dbData.email, "Notification - DSMUN Base", message.replace( '<br>', '\r\n' ), message );
                    Mailer.instance.sendMail( msg, ( err, res ) => {

                        if( err ) {
                            Logger.error( err );

                            ResponseBuilder( 511, "There was an error encountered during the processing of that request. This should be resolved in no time. Please try again later.", null, reply );
                            return;
                        }

                        ResponseBuilder( 200, "An email was sent to the associated account.", {

                            notificationId,

                        }, reply );

                    } );


                } ).catch( ( err ) => {

                    Logger.error( err );

                    ResponseBuilder( 454, "The provided notification already exists.", null, reply );

                } );

            } ).catch( ( err ) => {

                Logger.error( err );

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );

            } );

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

};

export default handlers;
