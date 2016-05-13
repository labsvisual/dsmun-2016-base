import ResponseBuilder from '../../response';

const handlers = {

    test( request, reply ) {

        for( let i = 0; i < 9999; i++ ) {
            ResponseBuilder( 200, "All systems operational", null, null );
        }

    }

};

export default handlers;
