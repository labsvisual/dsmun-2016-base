import ResponseBuilder from '../../response.js';
import Knex from '../../knex.js';
import * as RandomString from 'randomstring';

const handlers = {

    authUser( request, reply ) {

        const users = Knex( 'users' ).where( {

            username: request.payload.username

        }).select( 'password', 'guid', 'role', 'is_confirmed' ).then( ( school ) => {

            if( school.length === 0 ) {

                ResponseBuilder( 411, "Username and/or password were entered incorrectly.", null, reply );

            } else {

                school = school[ 0 ];

                if( !school.is_confirmed ) {

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

                        ResponseBuilder( 500, "Server error!", null, reply );

                    } );

                } else {

                    ResponseBuilder( 411, "Username and/or password were entered incorrectly.", null, reply );

                }

            }

        } ).catch( ( err ) => {

            ResponseBuilder( 500, "Server error!", null, reply );

        } );

    },

    deauthUser( request, reply ) {

        const users = Knex( 'tokens' ).where( {
            guid: request.payload.guid,
            token: request.payload.token
        }).del().then( () => {

            ResponseBuilder( 200, "Successfully logged out.", null, reply );

        } ).catch( ( err ) => {

            ResponseBuilder( 500, "Server error!", null, reply );

        } );

    }

};

export default handlers;
