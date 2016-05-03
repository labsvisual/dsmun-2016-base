$( document ).ready( function() {

    $('.ui.dropdown').dropdown();

    $( '#header' ).click( function() {

        $('.ui.sidebar').sidebar('toggle');

    } );

});
