import ResponseBuilder from '../../response.js';
import Knex from '../../knex.js';

const handlers = {

    deauthUser( request, reply ) {

        const users = Knex( 'tokens' ).where( {
            guid: request.payload.guid,
            token: request.payload.token
        }).del().then( () => {

            ResponseBuilder( 200, "Successfully logged out.", null, reply );

        } ).catch( ( err ) => {

            Winston.log( 'error', err, {
                type: 'api_error'
            } );
            ResponseBuilder( 500, "Server error!", null, reply );

        } );

    }

};

export default handlers;
