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

            .createTable( 'tokens', function( tokensTable ) {

                tokensTable.increments();
                tokensTable.string( 'guid', 50 ).notNullable().references( 'guid' ).inTable( 'users' );

                tokensTable.string( 'token', 32 ).notNullable().unique();
                tokensTable.timestamp( 'created_at' ).notNullable().defaultTo( knex.fn.now() );
                tokensTable.integer( 'role' ).notNullable().defaultTo( 0 );
                tokensTable.boolean( 'is_revoked' ).notNullable().defaultTo( false );

            } )

            .createTable( 'confirmations', function( tokensTable ) {

                tokensTable.increments();
                tokensTable.string( 'guid', 50 ).notNullable().references( 'guid' ).inTable( 'users' );

                tokensTable.string( 'confirmation_id', 32 ).notNullable().unique();
                tokensTable.string( 'conference_guid', 36 ).notNullable();
                tokensTable.timestamp( 'created_at' ).notNullable().defaultTo( knex.fn.now() );

            } );

};

exports.down = function(knex, Promise) {

    return knex
            .schema
            .dropTableIfExists( 'tokens' )
            .dropTableIfExists( 'confirmations' )
            .dropTableIfExists( 'users' );

};
