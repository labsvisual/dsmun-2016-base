import path from 'path';

const configSelector = ( environment ) => {

    return ( require( path.join( __dirname, `${environment}.js` ) ).default );

};

export default configSelector;
