const Winston = require( 'winston' );

Winston.add( require( 'winston-graylog2' ), {

    name: 'DSMUN - Primary EC2',
    level: 'error',
    graylog: {

        servers: [

            {
                host: '52.76.9.136',
                port: '12201'
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
