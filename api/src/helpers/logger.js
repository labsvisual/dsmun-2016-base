const Winston = require( 'winston' );

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



Winston.add( Winston.transports.Console, {

    name: 'Console',
    colorize: true,
    timestamp: true,

} );

export default Winston;
