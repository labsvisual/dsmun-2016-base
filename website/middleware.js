/*!
        File Description: Defines non-volatile middleware for the application.
*/

const Good             = require( 'good' )
    , GoodConsole      = require( 'good-console' )
    , GoodGraylog2     = require( 'good-graylog2' );

const middlewares = [

    {
        register: Good,

        options: {

            reporters: [

                {

                    reporter: GoodConsole,

                    events: {

                        response: '*',
                        log: '*',

                    },

                },

                {

                    reporter: GoodGraylog2,
                    events: {
                        response: '*',
                        log: '*',
                        error: '*'
                    },
                    config: {
                        service: 'DSMUN_PRIMARY_WEBSITE',
                        host: '52.76.9.136',
                        port: '12202',
                    }

                }

            ],

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
