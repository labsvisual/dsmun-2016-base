import ResponseBuilder from '../../response.js';
import Knex from '../../knex.js';
import * as Crypto from '../../helpers/crypto.js';
import * as RandomString from 'randomstring';
import * as Guid from 'node-uuid';
import * as Mailer from '../../helpers/mailer.js';
import Helpers from '../../helpers/utils.js';
import ConferenceModel from '../../models/models.js';
import * as Logger from '../../helpers/logger';

const Hasher = require( 'node-hasher' )
    , _      = require( 'lodash' )
    , debug  = process.env.NODE_ENV !== 'production';

_.mixin( {
  compactObject: ( obj, keyName ) => {

     let clone = _.clone( obj );

     _.each( clone, ( value, key ) => {

       if( key === keyName ) {

         delete clone[ key ];

       }

     });

     return clone;

  }

} );

const handlers = {

    createConference( request, reply ) {

        const token = request.payload.token
            , guid  = request.payload.guid
            , data  = request.payload.data;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            const getSchoolName = Knex( 'users' ).where( {

                guid: dbData.guid,

            } ).select( 'school_name' ).then( ( dbData2 ) => {

                const confGuid = Guid.v4();

                dbData2 = dbData2[ 0 ];

                let dataToExtendWith = {

                    conferenceGuid: confGuid,
                    schoolName: dbData2.school_name,
                    schoolGuid: guid,
                    isConfirmed: false

                };

                dataToExtendWith = _.merge( data, dataToExtendWith );
                const model = new ConferenceModel( dataToExtendWith );

                model.save().then( ( doc ) => {

                    ResponseBuilder( 200, "Done!", doc, reply );

                } ).catch( ( err ) => {

                    Logger.info( err );
                    ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

                } );

            } );


        } ).catch( ( err ) => {

            Logger.error( err );
            ResponseBuilder( 511, "An invalid token was provided.", null, reply );

        } );

    },

    getConferences( request, reply ) {

        const token = request.query.token
            , guid  = request.query.guid;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid', 'role' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            ConferenceModel.filter( {

                schoolGuid: guid,

            } ).then( ( conferences ) => {

                ResponseBuilder( 200, null, conferences, reply );

            } ).catch( ( err ) => {

                Logger.error( err );

                ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

            } );

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    getUnconfirmedConferences( request, reply ) {

        const token = request.query.token
            , guid  = request.query.guid;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            ConferenceModel.filter( {

                schoolGuid: guid,
                isConfirmed: false,

            } ).then( ( conferences ) => {

                ResponseBuilder( 200, null, conferences, reply );

            } ).catch( ( err ) => {

                Logger.error( err );

                ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

            } );

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    getUnconfirmedConferencesCount( request, reply ) {

        const token = request.query.token
            , guid  = request.query.guid;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            ConferenceModel.filter( {

                schoolGuid: guid,
                isConfirmed: false,

            } ).count().execute().then( ( count ) => {

                ResponseBuilder( 200, null, {

                    count,

                }, reply );

            } ).catch( ( err ) => {

                Logger.error( err );

                ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

            } );

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    getAllConferences( request, reply ) {

        const token = request.query.token
            , guid  = request.query.guid;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid', 'role' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            if( dbData.role === 1 ) {

                ConferenceModel.then( ( conferences ) => {

                    ResponseBuilder( 200, null, conferences, reply );

                } ).catch( ( err ) => {

                    Logger.error( err );

                    ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

                } );

            } else {

                Logger.info( `Unauthorized operation executed against GUID ${ guid }` );
                ResponseBuilder( 403, "You are unauthorised for the operation.", null, reply );

            }

        } ).catch( ( err ) => {

            Logger.error( err );
            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    deleteConference( request, reply ) {


        const {
            conferenceGuid
        } = request.params;

        const {
            token,
            guid
        } = request.query;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid', 'role' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            if( dbData.role === 1 ) {

                ConferenceModel.filter( {

                    conferenceGuid,

                } ).delete().then( ( dat ) => {

                    ResponseBuilder( 200, null, null, reply );

                } ).catch( ( err ) => {

                    Logger.error( err );
                    ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

                } );

            } else {

                Logger.info( `Unauthorized operation executed against GUID ${ guid }` );
                ResponseBuilder( 403, "You are unauthorised for the operation.", null, reply );

            }

        } ).catch( ( err ) => {

            Logger.error( err );
            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    getConference( request, reply ) {

        const token = request.query.token
            , guid  = request.query.guid
            , confId = request.params.conferenceId;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid', 'role' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            if( dbData.role === 1 ) {

                ConferenceModel.filter( {

                    conferenceGuid: confId

                } ).then( ( conferences ) => {

                    ResponseBuilder( 200, null, conferences, reply );

                } ).catch( ( err ) => {

                    Logger.error( err );

                    ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

                } );

            } else {

                ConferenceModel.filter( {

                    schoolGuid: guid,
                    conferenceGuid: confId

                } ).then( ( conferences ) => {

                    ResponseBuilder( 200, null, conferences, reply );

                } ).catch( ( err ) => {

                    Logger.error( err );

                    ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

                } );

            }

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    getConfirmation( request, reply ) {

        const confId = request.params.conferenceGuid;

        ConferenceModel.filter( {

            conferenceGuid: confId

        } ).then( ( [ conference ] ) => {

            if( !conference.isConfirmed ) {

                reply.view( 'error', {
                    message: 'The conference has not yet been confirmed.'
                } );

            }

            let delegates = [];
            conference.delegateInformation.delegates.map( ( delegate ) => {

                delegate.mealPreference = delegate.mealPreference === 'veg' ? 'Vegetarian' : 'Non Vegetarian';

                const { committee } = delegate
                    , shortName     = committee;
                switch( committee ) {

                    case 'unsc':
                        delegate.committee = 'United Nations Security Council';
                        break;

                    case 'unscss':
                        delegate.committee = 'Supreme Council of Sovereign States';
                        break;

                    case 'disec':
                        delegate.committee = 'Disarmament and International Security Committee';
                        break;

                    case 'au':
                        delegate.committee = 'African Union';
                        break;

                    case( 'ec' ):
                        delegate.committee = 'European Council';
                        break;

                    case( 'iaea' ):
                        delegate.committee = 'International Atomic Energy Agency';
                        break;

                    case( 'unhrc' ):
                        delegate.committee = 'United Nations Human Rights Council';
                        break;

                    case( 'ls' ):
                        delegate.committee = 'Lok Sabha';
                        break;

                    case( 'ipc' ):
                        delegate.committee = 'International Press Corps';
                        break;

                    case( 'specpol' ):
                        delegate.committee = 'Special Political and Decolonisation Committee';
                        break;

                    case( 'scp' ):
                        delegate.committee = 'United Nations Special Committee on Palestine';
                        break;

                    case( 'odc' ):
                        delegate.committee = 'United Nations Office of Drugs and Crime';
                        break;

                    case( 'icao' ):
                        delegate.committee = 'International Civil Aviation Organisation';
                        break;

                }

                delegate.committeeShortName = shortName;

                delegates.push( delegate );

            } );

            conference.travelArrangements.onward.mode = ( () => {

                return ( conference.travelArrangements.onward.mode ? conference.travelArrangements.onward.mode.substring( 0, 1 ).toUpperCase() + conference.travelArrangements.onward.mode.substring( 1 ) : '' );

            } )();

            conference.travelArrangements.returnJourney.mode = ( () => {

                return ( conference.travelArrangements.returnJourney.mode ? conference.travelArrangements.returnJourney.mode.substring( 0, 1 ).toUpperCase() + conference.travelArrangements.returnJourney.mode.substring( 1 ) : '' );

            } )();

            conference.travelArrangements.onward.arrivalDate = ( () => {

                return ( conference.travelArrangements.onward.arrivalDate ? new Date( conference.travelArrangements.onward.arrivalDate ).toDateString() : '' );

            } )();

            conference.travelArrangements.onward.departureDate = ( () => {

                return ( conference.travelArrangements.onward.departureDate ? new Date( conference.travelArrangements.onward.departureDate ).toDateString() : '' );

            } )();

            conference.travelArrangements.returnJourney.arrivalDate = ( () => {

                return ( conference.travelArrangements.returnJourney.arrivalDate ? new Date( conference.travelArrangements.returnJourney.arrivalDate ).toDateString() : '' );

            } )();

            conference.travelArrangements.returnJourney.departureDate = ( () => {

                return ( conference.travelArrangements.returnJourney.departureDate ? new Date( conference.travelArrangements.returnJourney.departureDate ).toDateString() : '' );

            } )();

            conference.delegateInformation.delegates = delegates;

            reply.view( 'confirmation', _.merge( conference, {
                generated: new Date().toDateString(),
                confirmationId: conference.confirmationId
            } ) );

        } ).catch( ( err ) => {

            Logger.error( err );

            reply.view( 'error', {
                message: 'There was an error with the server. Please try again, later.'
            } );

        } );

    },

    confirmConference( request, reply ) {

        const token = request.payload.token
            , guid  = request.payload.guid
            , conferenceGuid = request.params.conferenceGuid;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid', 'role' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            if( dbData.role === 1 ) {

                const confirmationGuid = RandomString.generate( 48 );

                ConferenceModel.filter( {

                    conferenceGuid,

                } ).then( ( [ conference ] ) => {

                    if( !conference.isConfirmed ) {

                        ConferenceModel.filter( {

                            conferenceGuid,

                        } ).update( {

                            isConfirmed: true,
                            confirmationId: confirmationGuid,

                        } ).then( ( res ) => {

                            const msgHtml = `

                            Hey <b>${ conference.registration.facultyAdvisor.name }</b>, <br>
                            <br>
                            Your conference was confirmed and ratified by the DSMUN Management team. You
                            can view the confirmation sheet <a href="http://api.app.dsmun.com/conferences/confirm/${ conferenceGuid }">here</a>. <br>
                            <br>
                            The confirmation sheet contains all of the details you have given us for the conference.
                            If you feel that these details are incorrect in any way, feel free to drop a line to us
                            at dsmun@doonschool.com.
                            <br>
                            -- <br>
                            The DSMUN Team

                            `;

                            const message = Mailer.buildMessage( conference.registration.facultyAdvisor.email, "Conference Confirmed", msgHtml, msgHtml );
                            if( !debug ) {

                                Mailer.instance.sendMail( message, ( err, res ) => {

                                    if( err ) {

                                        Logger.error( err );

                                        ResponseBuilder( 511, "There was an error encountered during the processing of that request. This should be resolved in no time. Please try again later.", null, reply );
                                        return;
                                    }

                                    ResponseBuilder( 200, null, {

                                        confirmationId: confirmationGuid,

                                    }, reply );

                                } );

                            } else {

                                ResponseBuilder( 200, null, {

                                    confirmationId: confirmationGuid,

                                }, reply );

                            }

                        } ).catch( ( err ) => {

                            Logger.error( err );

                            ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

                        } );

                    } else {

                        ResponseBuilder( 201, null, {

                            confirmationId: conference.confirmationId

                        }, reply );

                    }

                } ).catch( ( err ) => {

                    ResponseBuilder( 404, "The conference was not found.", null, reply );

                } );

            } else if ( dbData.role === 0 ) {

                Logger.info( `Unauthorized operation executed against GUID ${ guid }` );
                ResponseBuilder( 403, "You are unauthorised for the operation.", null, reply );

            }

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

    updateConference( request, reply ) {

        const token = request.payload.token
            , guid  = request.payload.guid
            , conferenceId = request.params.conferenceId;

        let data  = request.payload.data;

        const checkToken = Knex( 'tokens' ).where( {

            is_revoked: false,
            token,

        } ).select( 'guid', 'role' ).then( ( dbData ) => {

            dbData = dbData[ 0 ];
            if( dbData.guid !== guid || dbData.guid === undefined ) {

                ResponseBuilder( 511, "The provided token is invalid.", null, reply );
                return;

            }

            if( ( ( Object.keys( data ).indexOf( 'isConfirmed' ) > -1 ) || Helpers.containsKey( data, 'isFormFilled' ) || Helpers.containsKey( data, 'isCommitteeConfirmed' ) ) && dbData.role !== 1 ) {

                data = _.compactObject( data, 'isConfirmed' );
                data = _.compactObject( data, 'isFormFilled' );
                data = _.compactObject( data, 'isCommitteeConfirmed' );

            }

            if( dbData.guid === guid && dbData.role === 0 ) {

                ConferenceModel.filter( {

                    conferenceGuid: conferenceId,
                    schoolGuid: guid,

                } ).update( data ).then( ( res ) => {

                    ResponseBuilder( 200, "Account details updated!", null, reply );

                } ).catch( ( err ) => {

                    Logger.error( err );

                    ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

                } );

            } else if ( dbData.guid !== guid || dbData.role === 1 ) {

                ConferenceModel.filter( {

                    conferenceGuid: conferenceId,

                } ).update( data ).then( ( res ) => {

                    ResponseBuilder( 200, "Account details updated!", null, reply );

                } ).catch( ( err ) => {

                    Logger.error( err );

                    ResponseBuilder( 511, "An error was encountered! Please try again later, or contact the developer.", null, reply );

                } );

            }

        } ).catch( ( err ) => {

            Logger.error( err );

            ResponseBuilder( 511, "The provided token is invalid.", null, reply );

        } );

    },

};

export default handlers;
