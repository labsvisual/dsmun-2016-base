$( document ).ready( function() {

    $( '.menu .item' ).tab();

    $( '#header' ).click( function() {

        $('.ui.sidebar').sidebar('toggle');

    } );

});
