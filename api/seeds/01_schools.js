exports.seed = function(knex, Promise) {

    var tableName = 'users';

    var rows = [

        {

            username: 'doonschool',
            password: '8cef0efdea3fd3ec7ddf435521c834b4b5a4ae468247a82b36dd6dc02bc2427197da4e206017d21a45af069bdae6b60f9156e2a6bdc225ee15caab2d1a888f6f',
            guid: 'fd09e5cc-75c7-4282-820a-52697a7b0055',
            email: '334@doonschool.com',
            role: 1,
            is_confirmed: true,
            teacher_escort: 'Mr. Mohit Sinha',
            school_name: 'The Doon School'

        },

        {

            username: 'welhamgirls',
            password: '8cef0efdea3fd3ec7ddf435521c834b4b5a4ae468247a82b36dd6dc02bc2427197da4e206017d21a45af069bdae6b60f9156e2a6bdc225ee15caab2d1a888f6f',
            guid: 'f4e07143-511a-43a2-9d94-c0fd6e1775f8',
            email: 'mun@welhamgirls.com'

        }

    ];

    return knex( tableName )
        .del()
        .then( function() {
            return knex.insert( rows ).into( tableName );
        });

};
