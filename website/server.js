/*!
        File Description: Defines the base-level application directive. Contains
                          server launch parameters.
*/

import Hapi from 'hapi';

import configProvider   from './config/config';
import middleware       from './middleware';
import routes           from './routes';
import serverReporter   from './reporters/server';

// ---------- BASE LEVEL APP ENTRY DIRECTIVE ----------

const server = new Hapi.Server()
    , conf   = configProvider( 'development' );

// /----------------------------------------------------

// ---------- SERVICE REGISTERS ---------------

server.register( require( 'inert' ), () => {} );
server.register( require( 'vision' ), () => {

    server.views( {

        engines: {

            view: require( 'handlebars' )

        },

        relativeTo: __dirname,
        path: 'views'

    } );

} );

// / ------------------------------------------

server.connection( conf.hapiConfig );

server.route( {

    path: '/public/{path*}',
    method: 'GET',
    handler: {

        directory: {

            path: './views/static',
            listing: false,
            index: false

        }

    }

} );

middleware( server );
routes( server );

// NOTE: do NOT use annonymous function as event-handlers as when we're debugging
//       the application, the stack traces won't have any clue as to what this is.
server.start( ( err ) => {

    serverReporter( err, server );

} );
