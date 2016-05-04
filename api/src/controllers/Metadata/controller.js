import ResponseBuilder from '../../response.js';
import Knex from '../../knex.js';
import * as RandomString from 'randomstring';

const http = require( 'request' );

const handlers = {

    getStates( request, reply ) {

        const countryCode = request.params.countryCode;
        http( `http://www.geodatasource.com/get-dropdown-list.json?countryCode=${ countryCode }`, ( error, response, body ) => {

            if( response.statusCode === 200 ) {
                return ResponseBuilder( 200, null, JSON.parse( body ), reply );
            }

        } );

    }

};

export default handlers;
