const handlers = {

    showPage( request, reply ) {

        const { committeeName } = request.params;
        reply.view( 'index' );

    }

};

export default handlers;
