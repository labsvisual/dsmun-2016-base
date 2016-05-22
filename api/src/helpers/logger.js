const Winston = require( 'winston' )
    , debug   = process.env.NODE_ENV !== 'production'
    , _       = require( 'lodash' )
    , RandomString = require( 'randomstring' );

if( !debug ) {
    Winston.add( require( 'winston-graylog2' ), {

        name: 'DSMUN - Management Application',
        level: 'error',
        graylog: {

            servers: [

                {
                    host: '52.77.145.233',
                    port: '5555'
                }

            ],

            facility: 'DSMUN_MANAGEMENT_APPLICATION'

        }

    } );
}

Winston.add( Winston.transports.Console, {

    name: 'Console',
    colorize: true,
    timestamp: true,

} );

export const info = ( message ) => {

    const message_id = RandomString.generate( 32 );

    const data = _.merge( message, err, {
        type: 'api_info',
        message_id,
    } );

    Winston.log( 'info', data );

};

export const error = ( err ) => {

    const error_id = RandomString.generate( 32 );

    const data = _.merge( err, {
        type: 'api_error',
        error_id,
    } );

    Winston.log( 'error', data );

};
