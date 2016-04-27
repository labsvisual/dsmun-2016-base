const thinky = require( 'thinky' )( {

    host: '192.168.33.10',
    db: 'dsmun'

} );

const type = thinky.type;

const model = thinky.createModel( 'conference', {

    conferenceGuid: type.string(),
    schoolGuid: type.string(),
    isConfirmed: type.boolean().default( false ),

    registration: {

        name: type.string(),
        delegationSize: type.number(),
        countryPreference: type.array(),

        address: {

            street: type.string(),
            city: type.string(),
            pin: type.number(),
            state: type.string(),
            country: type.string(),

        },

        facultyAdvisor: {

            name: type.string(),
            mobileNumber: type.number(),
            landLineNumber: type.number(),
            email: type.string()

        },

        isFormFilled: type.boolean().default( false ),

    },

    delegateInformation: {

        delegates: [ {

            name: type.string(),
            committee: type.string(),
            gender: type.string(),
            mealPreference: type.string(),
            isCommitteeConfirmed: type.boolean().default( false ),
            delegateGuid: type.string()

        } ],

        isFormFilled: type.boolean().default( false ),

    },

    medicalHistory: {

        delegates: [ {

            delegateGuid: type.string(),
            grade: type.string(),
            dateOfBirth: type.string(),
            height: type.number(),
            weight: type.number(),
            bloodGroup: type.string(),
            hbPercentage: type.number(),
            medicalConditions: type.string(),

            family: {

                fatherName: type.string(),
                motherName: type.string(),
                contactNo: type.number(),
                landLineNo: type.number()

            }

        } ],

        isFormFilled: type.boolean().default( false ),

    },

    travelArrangements: {

        totalPassengers: type.number(),
        isFormFilled: type.boolean().default( false ),

        onward: {

            arrivalDate: type.string(),
            timeOfArrival: type.string(),
            mode: type.string(),
            placeOfDeparture: type.string(),
            departureDate: type.string(),
            details: type.string(),

        },

        returnJourney: {

            arrivalDate: type.string(),
            timeOfArrival: type.string(),
            mode: type.string(),
            placeOfDeparture: type.string(),
            departureDate:type. string(),
            details: type.string(),

        }

    },

    generalAssembly: {

        delegates: [ {

            delegateGuid: type.string()

        } ],

        isFormFilled: type.boolean().default( false ),

    }

}, {

    pk: 'conferenceGuid'

} );

export default model;
