const Winston = require( 'winston' )
    , debug   = process.env.NODE_ENV !== 'production'
    , _       = require( 'lodash' )
    , RandomString = require( 'randomstring' );

Winston.add( Winston.transports.Console, {

    name: 'Console',
    colorize: true,
    timestamp: true,

} );

export const info = ( message ) => {

    const message_id = RandomString.generate( 32 );

    const data = _.merge( message, {
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
