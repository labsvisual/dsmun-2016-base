import * as Crypto from 'crypto';

export const getHmac = ( algorithm, key, text ) => {

    return ( Crypto.createHmac( algorithm, key ).update( text ).digest( 'hex' ) );

};
