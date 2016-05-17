import ResponseBuilder from '../../response.js';
import Knex from '../../knex.js';

import Winston from '../../helpers/logger';
import * as RandomString from 'randomstring';
import * as Mailer from '../../helpers/mailer.js';
var Hasher = require( 'node-hasher' );

const handlers = {

    resetPassword( request, reply ) {

        const token = request.params.resetToken;
        const users = Knex( 'users' ).where( {

            pass_reset_code: token

        } ).select( 'forgot_password', 'username' ).then( ( data ) => {

            const forgot_password = ( data[ 0 ].forgot_password === 1 );

            if( !forgot_password ) {

                reply.view( 'error', {
                    message: "The provided password reset token has already been consumed. "
                } );

                return;

            }

            const schoolReset = Knex( 'users' ).where( {

                pass_reset_code: token,
                username: request.payload.username

            } ).update( {

                password: Hasher( 'sha512', request.payload.password ),

                pass_reset_code: null,
                forgot_password: 0

            } ).then( ( success ) => {

                const message = 'The password was successfully changed!';
                const caption = 'Password Successfully Changed';

                reply.view( 'success', {
                    message,
                    caption
                } );

            } ).catch( ( err ) => {

                Winston.log( 'error', err, {
                    type: 'api_error'
                } );
                ResponseBuilder( 511, "An error was encountered during the process.", null, reply );

            } );

        } ).catch( ( err ) => {

            Winston.log( 'error', err, {
                type: 'api_error'
            } );
            reply.view( 'error', {
                message: "The provided password reset token has already been consumed. "
            } );

        } );

    },

    renderClientSide( request, reply ) {

        const token = request.params.resetToken;
        const users = Knex( 'users' ).where( {
            pass_reset_code: token
        } ).select( 'forgot_password', 'username' ).then( ( data ) => {

            const forgot_password = ( data[ 0 ].forgot_password === 1 );
            const username = data[ 0 ].username;

            if( !forgot_password ) {

                reply.view( 'error', {
                    message: "The provided password reset token has already been consumed. "
                } );

            }

            reply.view( 'index', {
                username,
                resetToken: token
            } );

        } ).catch( ( err ) => {

            Winston.log( 'error', err, {
                type: 'api_error'
            } );

            reply.view( 'error', {
                message: "The provided password reset token has already been consumed. "
            } );

        } );

    },

    initiatePasswordForgot( request, reply ) {

        const users = Knex( 'users' ).where( {

            username: request.payload.username,

        }).select( 'email' ).then( ( email ) => {

            email = email[ 0 ].email;
            const pass_reset_code = RandomString.generate( 32 );

            Knex( 'users' ).where( {

                username: request.payload.username,

            } ).update( {

                pass_reset_code,
                forgot_password: true,

            } ).then( ( id ) => {

                const msgHtml = `

                Hey <b>${ request.payload.username }</b>, <br>
                <br>
                A password reset request was initiated for this account. If you're the one who initiated
                the request, please click <a href="http://api.app.dsmun.com/forgot/${ pass_reset_code }">here</a>
                to reset your password. <br>
                <br>
                If it wasn't you, just ignore this email.<br>
                <br>
                -- <br>
                The DSMUN Team

                `;

                const msgText = `

                Hey ${ request.payload.username }

                A password reset request was initiated for this account. If you're the one who initiated
                the request, please click <a href="https://api.app.dsmun.com/forgot/${ pass_reset_code }">here</a>
                to reset your password.

                If it wasn't you, just ignore this email.

                --
                The DSMUN Team

                `;

                const message = Mailer.buildMessage( email, "Reset password!", msgText, msgHtml );
                Mailer.instance.sendMail( message, ( err, res ) => {

                    if( err ) {
                        Winston.log( 'error', err, {
                            type: 'api_error'
                        } );
                        ResponseBuilder( 511, "There was an error encountered during the processing of that request. This should be resolved in no time. Please try again later.", null, reply );
                        return;
                    }

                    ResponseBuilder( 200, "An email was sent to the associated account.", null, reply );

                } );

            } );

        } ).catch( ( err ) => {

            Winston.log( 'error', err, {
                type: 'api_error'
            } );
            ResponseBuilder( 411, "The specified username was not found in the database!", null, reply );

        } );

    }

};

export default handlers;
