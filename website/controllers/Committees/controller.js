import * as fs from 'fs';

function committeeExists( filePath ) {

    try {

        const stats = fs.lstatSync( `${ __dirname }/../../views/committees/${ filePath }.view` );
        return ( stats && !stats.isDirectory() );

    } catch( e ) {

        return false;

    }

}

const handlers = {

    showPage( request, reply ) {

        const { committeeName } = request.params
            , filePath          = `committees/${ committeeName }`;

        if( committeeExists( committeeName ) ) {

            reply.view( filePath );

        } else {

            reply.view( '404' );

        }

    },

    showIndexPage( request, reply ) {

        reply.view( 'index' );

    }

};

export default handlers;
