const config = {

    hapiConfig: {

        port: 3345,
        routes: {
            cors: true
        }

    },

    database: {

        client: 'mysql',
        connection: {

            host: '192.168.33.10',

            user: 'shreyansh',
            password: 'shreyansh',

            database: 'dsmun',
            charset: 'utf8',

        },

    },

};

config.knexInstance = require( 'knex' )( config.database );
config.bookshelf    = require( 'bookshelf' )( config.knexInstance );

export default config;
