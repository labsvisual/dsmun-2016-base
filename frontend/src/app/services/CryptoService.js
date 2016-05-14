angular
    .module( 'app' )
    .factory( 'CryptoService', [ function() {

        return {

            getSha512: function( data ) {

                var shaObj = new jsSHA( "SHA-512", "TEXT" );
                shaObj.update( data );
                return shaObj.getHash( "HEX" );

            },

            getHmac: function( data, key ) {

                var shaObj = new jsSHA('SHA-512', "TEXT");
                shaObj.setHMACKey( key, "TEXT");
                shaObj.update( data );
                return shaObj.getHMAC("HEX");

            }

        };

    } ] );
