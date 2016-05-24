exports.seed = function(knex, Promise) {

    var tableName = 'tokens';

    var rows = [

        {

            guid: 'fd09e5cc-75c7-4282-820a-52697a7b0055',
            token: 'Ptzg1cvAg61ks530seE80ftT3cx2xeul',

        },

        {

            guid: 'f4e07143-511a-43a2-9d94-c0fd6e1775f8',
            token: 'JFo4kWilBdiK7wC64OfqlyF26yiNZv1X'

        }

    ];

    return knex( tableName )
        .del()
        .then( function() {
            return knex.insert( rows ).into( tableName );
        });

};
