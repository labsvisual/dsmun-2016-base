import ResponseBuilder from '../../response.js';
import Knex from '../../knex.js';
import * as RandomString from 'randomstring';
import * as Logger from '../../helpers/logger';

const handlers = {

    authUser( request, reply ) {

        const users = Knex( 'users' ).where( {

            username: request.payload.username

        }).select( 'password', 'guid', 'role', 'is_confirmed' ).then( ( school ) => {

            if( school.length === 0 ) {

                Logger.info( 'Incorrect username and password' );
                ResponseBuilder( 411, "Username and/or password were entered incorrectly.", null, reply );

            } else {

                school = school[ 0 ];

                if( !school.is_confirmed ) {

                    Logger.info( `Unconfirmed account ${ school.guid } tried to login.` );
                    ResponseBuilder( 411, "The associated account hasn't been activated.", null, reply );
                    return;

                }

                if( school.password === request.payload.password ) {

                    const token = RandomString.generate( 32 );

                    Knex( 'tokens' ).insert( {

                        guid: school.guid,
                        token,
                        role: school.role

                    } ).then( ( id ) => {

                        ResponseBuilder( 200, "Logged in successfully!", {

                            username: request.payload.username,
                            guid: school.guid,
                            token,
                            role: school.role

                        }, reply );

                    } ).catch( ( err ) => {

                        Logger.error( err );
                        ResponseBuilder( 500, "Server error!", null, reply );

                    } );

                } else {

                    ResponseBuilder( 411, "Username and/or password were entered incorrectly.", null, reply );

                }

            }

        } ).catch( ( err ) => {

            Logger.error( err );
            ResponseBuilder( 500, "Server error!", null, reply );

        } );

    },

    isTokenValid( request, reply ) {

        const users = Knex( 'tokens' ).where( {

            token: request.params.token,
            is_revoked: false

        }).select( 'guid' ).then( ( [ data ] ) => {

            if( data ) {

                ResponseBuilder( 200, null, {
                    valid: true,
                    guid: data.guid,
                }, reply );

            } else {

                ResponseBuilder( 200, null, {
                    valid: false,
                }, reply );

            }

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 200, null, {
                valid: false,
                guid: data.guid,
            }, reply );

        } );

    }

};

export default handlers;
