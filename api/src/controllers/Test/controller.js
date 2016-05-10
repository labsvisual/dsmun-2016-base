import Winston from '../../helpers/logger';

const handlers = {

    test( request, reply ) {

        Winston.error( 'OPS' );
        Winston.info( 'YO!' );

        reply( 'Hello' );

    }

};

export default handlers;
