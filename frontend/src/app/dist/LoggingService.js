angular
    .module( 'app' )
    .factory( 'TraceService', function() {

        return( {

            print: function() {}

        } );

    } );

angular
    .module( 'app' )
    .provider( '$exceptionHandler', {

        $get: function( ExceptionLoggingService ) {

            return ( ExceptionLoggingService );

        }

    } );

angular
    .module( 'app' )
    .factory( 'ExceptionLoggingService', [ '$log', '$window', 'TraceService', function( $log, $window, traceService ) {

        function error( exception, cause ) {

            $log.error.apply( $log, arguments );

            try {

                const errorMessage = exception.toString()
                    , stackTrace   = traceService.print( {
                        e: exception,
                    } );

                $.ajax( {

                    type: 'POST',
                    url : 'http://api.app.beta.dsmun.com/log',
                    contentType: 'application/json',
                    data: angular.toJson( {

                        url: $window.location.href,
                        message: errorMessage,
                        type: 'EXCEPTION',
                        stackTrace,
                        cause: ( cause || '' )

                    } )

                } );

            } catch ( loggingError ) {

                $log.warn( 'Error in sending log message to logging pipe line.' );
                $log.log( loggingError );

            }

        }

        return ( error );

    } ] );
