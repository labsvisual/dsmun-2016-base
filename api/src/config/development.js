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

            host: process.env.MYSQL_HOST || '192.168.33.10',

            user: process.env.MYSQL_USER || 'shreyansh',
            password: process.env.MYSQL_PASS || 'shreyansh',

            database: process.env.MYSQL_NAME || 'dsmun',
            charset: 'utf8',

        },

    },

};

config.knexInstance = require( 'knex' )( config.database );
config.bookshelf    = require( 'bookshelf' )( config.knexInstance );

export default config;
