import ResponseBuilder from '../../response.js';
import Knex from '../../knex.js';

import * as Logger from '../../helpers/logger';

const handlers = {

    deauthUser( request, reply ) {

        const users = Knex( 'tokens' ).where( {

            guid: request.payload.guid,
            token: request.payload.token

        } ).del().then( () => {

            ResponseBuilder( 200, "Successfully logged out.", null, reply );

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 500, "Server error!", null, reply );

        } );

    }

};

export default handlers;
