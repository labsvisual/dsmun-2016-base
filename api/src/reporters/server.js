var reportingHandler = ( err, server ) => {                                                 // jshint ignore:line

    if ( err ) {

        throw err;

    } else {

        // console.log( server );
        console.log( `API Server Running on port ${ server.info.port }\n` );

    }

};

export default reportingHandler;
