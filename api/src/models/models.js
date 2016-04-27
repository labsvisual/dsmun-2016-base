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

        },

        isFormFilled: false

    },

    delegateInformation: {

        delegates: [ {

            name: String,
            committee: String,
            gender: String,
            mealPreference: String,
            isCommitteeConfirmed: Boolean,
            delegateGuid: String

        } ],

        isFormFilled: false

    },

    medicalHistory: {

        delegates: [ {

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

        isFormFilled: false

    },

    travelArrangements: {

        totalPassengers: Number,
        isFormFilled: false,

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

    generalAssembly: {

        delegates: [ {

            delegateGuid: String

        } ],

        isFormFilled: false

    }

}, {

    pk: 'conferenceGuid'

} );

export default model;
