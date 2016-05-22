import ResponseBuilder from '../../response.js';
import Knex from '../../knex.js';
import * as Crypto from '../../helpers/crypto.js';
import * as RandomString from 'randomstring';
import * as Guid from 'node-uuid';
import * as Mailer from '../../helpers/mailer.js';
import * as Helpers from '../../helpers/utils.js';

import * as Logger from '../../helpers/logger';

var Hasher = require( 'node-hasher' );

const handlers = {

    confirmUser( request, reply ) {

        const confirmationToken = request.params.confirmationToken
            , userGuid          = request.params.guid;

        const getConfirmationData = Knex( 'users' ).where( {

            guid: userGuid

        } ).select( 'is_confirmed', 'confirmation_code' ).then( ( data ) => {

            data = data[ 0 ];
            if( data.is_confirmed ) {

                reply.view( 'error', {
                    message: "The provided account confirmation token has already been consumed."
                } );

            } else {

                if( data.confirmation_code === confirmationToken ) {

                    const confirmationReset = Knex( 'users' ).where( {

                        confirmation_code: confirmationToken,
                        guid: userGuid

                    } ).update( {

                        confirmation_code: null,
                        is_confirmed: true

                    } ).then( ( success ) => {

                        const message = 'The account has successfully been activated!';
                        const caption = 'Account Successfully Activated';

                        reply.view( 'success', {
                            message,
                            caption
                        } );

                    } ).catch( ( err ) => {

                        Logger.error( err );

                        ResponseBuilder( 511, "An error was encountered during the process.", null, reply );

                    } );

                } else {

                    reply.view( 'error', {
                        message: 'The provided account confirmation token is invalid.'
                    } );

                }

            }

        } );

    },

    createUser( request, reply ) {

        const data  = request.payload.data
            , token = request.payload.token
            , hash  = request.payload.hash;

        if( !data.email || !data.username || !data.school_name || !data.teacher_escort ) {

            ResponseBuilder( 406, 'The provided data payload is invalid.', null, reply );
            return;

        }

        const getRequestGuid = Knex( 'tokens' ).where( {

            token,
            is_revoked: false,

        } ).select( 'guid', 'role' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.role !== 1 ) {

                ResponseBuilder( 511, "The provided user does not have the privileges to execute that operation.", null, reply );
                return;

            }

            const hashCalculated = Crypto.getHmac( 'sha512', dbData.guid, ( data.username + data.email ) );
            if( hashCalculated !== hash ) {
                ResponseBuilder( 400, "The provided signature is invalid.", null, reply );
                return;
            }

            const generatedPassword = RandomString.generate( 7 )
                , generatedGuid     = Guid.v4()
                , activationKey     = RandomString.generate( 16 )
                , pass_reset_code   = RandomString.generate( 32 );

            let insertObject = {

                username: data.username,
                password: Hasher( 'sha512', generatedPassword ),
                email: data.email,
                guid: generatedGuid,
                school_name: data.school_name,
                teacher_escort: data.teacher_escort,
                forgot_password: true,
                pass_reset_code,

            };

            if( data.isConfirmed ) {

                insertObject.is_confirmed = true;

            } else {

                insertObject.is_confirmed = false;
                insertObject.confirmation_code = activationKey;

            }

            const insertIntoTable = Knex( 'users' ).insert( insertObject ).then( ( id ) => {

                if( data.sendEmail ) {

                    const message = `

                    Hey ${ data.username }, <br>
                    <br>
                    An account related to this email was created for DSMUN Base. You can confirm the account by
                    clicking <a href="http://api.app.dsmun.com/users/confirm/${ generatedGuid }/${ activationKey }">here</a>. <br>
                    <br>
                    The username for the account is: <b>${ data.username }</b><br>
                    The password for the account is: <b>${ generatedPassword }</b><br>
                    <br>
                    Now, we know that the passowrd is really tough to remember, so, you can change your
                    password by following <a href="http://api.app.dsmun.com/reset/${ pass_reset_code }">this</a> link.
                    <br>
                    If you believe that this is a mistake, you can safely ignore and/or delete this email. :) <br>
                    <br>
                    --<br>
                    The DSMUN Team.
                    `;

                    const msg = Mailer.buildMessage( data.email, "Confirm Account - DSMUN Base", message.replace( '<br>', '\r\n' ), message );
                    Mailer.instance.sendMail( msg, ( err, res ) => {

                        if( err ) {
                            Logger.error( err );

                            ResponseBuilder( 511, "There was an error encountered during the processing of that request. This should be resolved in no time. Please try again later.", null, reply );
                            return;
                        }

                        ResponseBuilder( 200, "An email was sent to the associated account.", null, reply );

                    } );

                } else {

                    ResponseBuilder( 200, "Account created successfully.", {

                        generatedPassword,

                    }, reply );

                }



            } ).catch( ( err ) => {

                Logger.error( err );

                ResponseBuilder( 454, "The provided user already exists.", null, reply );

            } );

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    updateUser( request, reply ) {

        const data  = request.payload.data
            , token = request.payload.token
            , hash  = request.payload.hash;

        const getRequestGuid = Knex( 'tokens' ).where( {

            token,
            is_revoked: false,

        } ).select( 'guid', 'role' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.role !== 1 ) {

                ResponseBuilder( 511, "The provided user does not have the privileges to execute that operation.", null, reply );
                return;

            }

            let dataToHash = '';

            Object.keys( data ).forEach( ( key ) => {

                dataToHash += data[ key ];

            } );

            const hashCalculated = Crypto.getHmac( 'sha512', dbData.guid, dataToHash );
            if( hashCalculated !== hash ) {
                ResponseBuilder( 400, "The provided signature is invalid.", null, reply );
                return;
            }

            const insertIntoTable = Knex( 'users' ).where( {

                guid: request.params.guid

            } ).update( data ).then( ( id ) => {

                ResponseBuilder( 200, "Account details successfully updated!", null, reply );

            } ).catch( ( err ) => {

                Logger.error( err );

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );

            } );

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    getAllUsers( request, reply ) {

        const token = request.query.token;

        const getRole = Knex( 'tokens' ).where( {

            token,
            is_revoked: false,

        } ).select( 'guid', 'role' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.role !== 1 ) {

                Winston.warn( `An attempt to execute an escalated operation was noted ${ token }` );
                ResponseBuilder( 511, "The provided user does not have the privileges to execute that operation.", null, reply );
                return;

            }

            const userList = Knex( 'users' ).select( 'email', 'guid', 'role', 'school_name', 'teacher_escort', 'username' ).then( ( data ) => {

                let usersArr = [];
                data.forEach( ( user ) => {

                    usersArr.push( user );

                } );

                ResponseBuilder( 200, null, usersArr ,reply );

            } );

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    getUser( request, reply ) {

        const token = request.query.token
            , guid  = request.params.guid;

        const getRole = Knex( 'tokens' ).where( {

            token,
            is_revoked: false,

        } ).select( 'guid', 'role' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.role !== 1 && dbData.guid !== guid ) {

                Winston.warn( `An attempt to execute an escalated operation was noted ${ guid }` );
                ResponseBuilder( 511, "The provided user does not have the privileges to execute that operation.", null, reply );
                return;

            }

            const userList = Knex( 'users' ).where( {
                guid,
            } ).select( 'email', 'guid', 'role', 'school_name', 'teacher_escort', 'username' ).then( ( data ) => {

                if( data.length === 0 ) {

                    ResponseBuilder( 511, "The specified user was not found.", null, reply );
                    return;

                }

                ResponseBuilder( 200, null, data ,reply );

            } ).catch( ( err ) => {

                Logger.error( err );

                ResponseBuilder( 511, "The specified user was not found.", null, reply );

            } );

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

};

export default handlers;
