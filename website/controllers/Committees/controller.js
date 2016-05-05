const handlers = {

    showPage( request, response ) {

        const { committeeName } = request.params;
        console.log( committeeName );

    }

};

export default handlers;
