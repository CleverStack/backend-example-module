var Task = require( 'classes' ).Task
  , async = require( 'async' )
  , debug = require( 'debug' )( 'ExampleTask' );
 
module.exports = Task.extend(
{
    init: function( payload, callback ) {
        async.parallel([
            this.proxy( 'hello' ),
            this.proxy( 'name' )
        ],
        function(err, results){
            debug( 'Finished.' );
            callback( err, results.join( ' ' ) );
        });
    },
 
    hello: function( callback ) {
        callback( null, 'Hello' );
    },

    name: function( callback ) {
        callback( null, this.payload.name );
    }
});