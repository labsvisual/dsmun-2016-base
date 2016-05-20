import Path from 'path';
import IO   from 'fs';
import RandomString from 'randomstring';
import Guid         from 'node-uuid';
import Crypto       from 'crypto';

const fileNames = ( () => {

    const args = process.argv.splice( 2 );

    let retVal = {};

    args.forEach( ( arg, index ) => {

        if( arg.toLowerCase() === '--in-filename' ) {

            retVal.inFilename = args[ index + 1 ];

        }

        if( arg.toLowerCase() === '--out-filename' ) {

            retVal.outFilename = args[ index + 1 ];

        }

    } );

    return retVal;

} )();

const getPassword = ( pass ) => {

    return Crypto.createHash( 'sha512' )
                       .update( pass )
                       .digest( 'hex' )

};

const processData = ( { inFilename = 'in.txt', outFilename = 'out.txt' } ) => {

    inFilename = Path.join( __dirname, inFilename );
    outFilename = Path.join( __dirname, outFilename );

    let outSql = ''
      , outData = 'Username,Password,GUID,Teacher Escort\r\n';

    IO.readFile( inFilename, 'utf8', ( err, contents ) => {

        if( err ) return console.error( err );

        contents = contents.trim().split( '\n' ).forEach( ( datIn ) => {

            const inData = datIn.split( ';' );
            let [ school, teacher ] = inData;

            school = school.toLowerCase().replace( / /, '' );

            const password = RandomString.generate( 7 )
                , guid     = Guid.v4()
                , confirmation_code = RandomString.generate( 16 );

            outSql += `INSERT INTO users ( 'username', 'password', 'guid', 'confirmation_code', 'teacher_escort' ) VALUES( '${ school }', '${ getPassword( password ) }', '${ guid }', '${ confirmation_code }', '${ teacher }' )\r\n`;
            outData += `${ school },${ password },${ guid },${ teacher }\r\n`;

        } );

        const dataToWrite = `
====================
===== GENERATED DATA
====================

${ outData }

====================
===== SQL DUMP
====================

${ outSql }

        `;

        IO.writeFile( outFilename, dataToWrite, ( err ) => {

            if( err ) return console.log( 'Error!' );
            console.log( 'Done!' );

        } );

    } );

};

// Call the main function
processData( fileNames );
