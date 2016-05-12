import ResponseBuilder from '../../response';
import Winston from '../../helpers/logger';

const handlers = {

    log( request, reply ) {

        Winston.log( 'error', request.payload, {
            type: 'frontend'
        } );
        ResponseBuilder( 200, "Log piped", null, reply );

    }

};

export default handlers;
