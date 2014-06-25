var Task = require( 'classes' ).task
  , async = require( 'async' )
  , debug = require( 'debug' )( 'ExampleLockingTask' );

module.exports = Task.extend(
{
    init: function( payload, callback ) {
      debug( 'Starting...' );
 
        async.parallel([
            this.proxy( 'doSomething' ),
            this.proxy( 'doSomethingElse')
        ],
        function(err, results){
            debug( 'Finished.' );
            callback( err );
        });
    },
 
    doSomething: function( callback ) {
        callback( null );
    },
 
    doSomethingElse: function( callback ) {
        callback( null );
    }
});
