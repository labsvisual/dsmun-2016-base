/*!
        File Description: Defines non-volatile middleware for the application.
*/

const Good             = require( 'good' )
    , GoodConsole      = require( 'good-console' )
    , GoodGraylog2     = require( 'good-graylog2' )
    , debug            = process.env.NODE_ENV !== 'production';

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

            ],

        },

    },

];

if( !debug ) {

    middlewares[ 0 ].options.reporters.push( {

        reporter: GoodGraylog2,
        events: {
            response: '*',
            log: '*',
            error: '*'
        },
        config: {
            service: 'DSMUN_MANAGEMENT_APPLICATION',
            host: '52.77.145.233',
            port: '5555',
        }

    } );

}

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
