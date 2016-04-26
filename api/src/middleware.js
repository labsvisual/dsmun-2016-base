/*!
        File Description: Defines non-volatile middleware for the application.
*/

const Good             = require( 'good' )
    , GoodConsole      = require( 'good-console' );

const middlewares = [

    {
        register: Good,

        options: {

            reporters: [ {

                reporter: GoodConsole,

                events: {

                    response: '*',
                    log: '*',

                },

            } ],

        },

    },

];

const attachMiddlwares = server => {

    middlewares.forEach(

        middleware => server.register( middleware, err => {

            if ( err ) {

                throw err;

            }

        } )

    );

};

export default attachMiddlwares;
