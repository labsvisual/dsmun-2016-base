import ResponseBuilder from '../../response';
import * as Logger from '../../helpers/logger';

const handlers = {

    log( request, reply ) {

        Logger.error( {

            data: request.payload,
            type: 'frontend_error'

        } );

        ResponseBuilder( 200, "Log piped", null, reply );

    }

};

export default handlers;
