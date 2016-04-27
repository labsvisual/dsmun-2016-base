// import Mongoose from 'mongoose';
//
// Mongoose.connect( 'mongodb://192.168.33.10:27017/scotchbox' );
//
// const Schema = Mongoose.Schema
//     , conferenceSchema = new Schema( {
//
//         conferenceGuid: String,
//         schoolGuid: String,
//         isConfirmed: Boolean,
//
//         registration: {
//
//             name: String,
//             delegationSize: Number,
//             countryPreference: Array,
//
//             address: {
//
//                 street: String,
//                 city: String,
//                 pin: Number,
//                 state: String,
//                 country: String,
//
//             },
//
//             facultyAdvisor: {
//
//                 name: String,
//                 mobile: Number,
//                 landline: Number,
//                 email: String
//
//             }
//
//         },
//
//         delegateInformation: [ {
//
//             name: String,
//             committee: String,
//             gender: String,
//             mealPreference: String,
//             isCommitteeConfirmed: Boolean,
//             delegateGuid: String
//
//         } ],
//
//         medicalHistory: [ {
//
//             delegateGuid: String,
//             grade: String,
//             dateOfBirth: String,
//             height: Number,
//             weight: Number,
//             bloodGroup: String,
//             hbPercentage: Number,
//             medicalConditions: String,
//             family: {
//
//                 fatherName: String,
//                 motherName: String,
//                 contactNo: Number,
//                 landLineNo: Number
//
//             }
//
//         } ],
//
//         travelArrangements: {
//
//             totalPassengers: Number,
//             onward: {
//
//                 arrivalDate: String,
//                 timeOfArrival: String,
//                 mode: String,
//                 placeOfDeparture: String,
//                 departureDate: String,
//                 details: String,
//
//             },
//
//             returnJourney: {
//
//                 arrivalDate: String,
//                 timeOfArrival: String,
//                 mode: String,
//                 placeOfDeparture: String,
//                 departureDate: String,
//                 details: String,
//
//             }
//
//         },
//
//         generalAssembly: [ {
//
//             delegateGuid: String
//
//         } ]
//
//     } );
//
// export default Mongoose.model( 'Conference', conferenceSchema );


const thinky = require( 'thinky' )( {

    host: '192.168.33.10',
    db: 'dsmun'

} );

const type = thinky.type;

const model = thinky.createModel( 'conference', {

    conferenceGuid: String,
    schoolGuid: String,
    isConfirmed: Boolean,

    registration: {

        name: String,
        delegationSize: Number,
        countryPreference: Array,

        address: {

            street: String,
            city: String,
            pin: Number,
            state: String,
            country: String,

        },

        facultyAdvisor: {

            name: String,
            mobile: Number,
            landline: Number,
            email: String

        }

    },

    delegateInformation: [ {

        name: String,
        committee: String,
        gender: String,
        mealPreference: String,
        isCommitteeConfirmed: Boolean,
        delegateGuid: String

    } ],

    medicalHistory: [ {

        delegateGuid: String,
        grade: String,
        dateOfBirth: String,
        height: Number,
        weight: Number,
        bloodGroup: String,
        hbPercentage: Number,
        medicalConditions: String,
        family: {

            fatherName: String,
            motherName: String,
            contactNo: Number,
            landLineNo: Number

        }

    } ],

    travelArrangements: {

        totalPassengers: Number,
        onward: {

            arrivalDate: String,
            timeOfArrival: String,
            mode: String,
            placeOfDeparture: String,
            departureDate: String,
            details: String,

        },

        returnJourney: {

            arrivalDate: String,
            timeOfArrival: String,
            mode: String,
            placeOfDeparture: String,
            departureDate: String,
            details: String,

        }

    },

    generalAssembly: [ {

        delegateGuid: String

    } ]

}, {

    pk: 'conferenceGuid'

} );

export default model;
