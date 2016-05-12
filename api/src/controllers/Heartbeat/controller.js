import ResponseBuilder from '../../response';

const handlers = {

    test( request, reply ) {

        ResponseBuilder( 200, "All systems operational", null, reply );

    }

};

export default handlers;
