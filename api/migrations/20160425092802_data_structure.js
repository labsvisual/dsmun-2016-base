exports.up = function(knex, Promise) {

    return knex
            .schema

            .createTable( 'users', function( usersTable ) {

                // Primary Key
                usersTable.increments();

                // Fields
                usersTable.string( 'username', 50 ).notNullable().unique();
                usersTable.string( 'password', 128 ).notNullable();
                usersTable.string( 'guid', 50 ).notNullable().unique();
                usersTable.string( 'pass_reset_code', 32 );
                usersTable.string( 'email', 250 ).notNullable().unique();
                usersTable.string( 'confirmation_code', 32 ).unique();
                usersTable.string( 'teacher_escort', 250 ).notNullable();
                usersTable.string( 'school_name', 250 ).notNullable();

                usersTable.integer( 'role' ).notNullable().defaultTo( 0 );
                usersTable.timestamp( 'created_at' ).notNullable().defaultTo( knex.fn.now() );
                usersTable.boolean( 'forgot_password' ).defaultTo( false );
                usersTable.boolean( 'is_confirmed' ).defaultTo( false );

            } )

            .createTable( 'conference_information', function( conferenceInfoTable ) {

                // Primary Key
                conferenceInfoTable.increments();

                // Composite
                conferenceInfoTable.string( 'guid', 50 ).notNullable().references( 'guid' ).inTable( 'users' );

                // Info
                conferenceInfoTable.string( 'conference_guid', 36 ).notNullable();
                conferenceInfoTable.boolean( 'form_one' ).notNullable().default( false );
                conferenceInfoTable.boolean( 'form_two' ).notNullable().default( false );
                conferenceInfoTable.boolean( 'form_three' ).notNullable().default( false );
                conferenceInfoTable.boolean( 'form_four' ).notNullable().default( false );
                conferenceInfoTable.boolean( 'form_five' ).notNullable().default( false );
                conferenceInfoTable.boolean( 'is_confirmed' ).notNullable().default( false );

            } )

            .createTable( 'conferences', function( conferencesTable ) {

                // Primary Key
                conferencesTable.increments()

                // Composite
                conferencesTable.string( 'guid', 50 ).notNullable().references( 'guid' ).inTable( 'users' );

                // Info
                conferencesTable.string( 'conference_guid', 50 ).unique().notNullable();
                conferencesTable.integer( 'year' ).notNullable();
                conferencesTable.boolean( 'is_confirmed' ).notNullable().defaultTo( false );

            } )

            .createTable( 'tokens', function( tokensTable ) {

                tokensTable.increments();
                tokensTable.string( 'guid', 50 ).notNullable().references( 'guid' ).inTable( 'users' );

                tokensTable.string( 'token', 32 ).notNullable().unique();
                tokensTable.timestamp( 'created_at' ).notNullable().defaultTo( knex.fn.now() );
                tokensTable.integer( 'role' ).notNullable().defaultTo( 0 );
                tokensTable.boolean( 'is_revoked' ).notNullable().defaultTo( false );

            } );

};

exports.down = function(knex, Promise) {

    return knex
            .schema
            .dropTableIfExists( 'conferences' )
            .dropTableIfExists( 'school_information' )
            .dropTableIfExists( 'tokens' )
            .dropTableIfExists( 'users' );

};
