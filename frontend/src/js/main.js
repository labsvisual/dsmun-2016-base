$( document ).ready( function() {

    console.debug( 'Loaded application chunk' );
    $( '.menu .item' ).tab();

    $( '#header' ).click( function() {

        $('.ui.sidebar').sidebar('toggle');

    } );

});
