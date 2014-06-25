module.exports = function ( Controller, ExampleService ) {
    return Controller.extend(
    {
        service: ExampleService
    },
    {
        /**
         * 'GET/PUT/POST/DELETE /example/custom'
         */
        customAction: function() {
            this.send({
                message: "Hello from customAction inside ExampleController"
            });
        },
 
        /**
         * This function can never be called because it does not have 'Action' on the end of it
         */
        hidden: function() {
            console.log('Hidden function called, this should be impossible');
            process.exit();
        },

        runBackgroundTaskAction: function( req, res ) {
            var ipcMessage = {
                cmd: 'backgroundTask',
                task: 'ExampleTask',
                payload: req.query
            }

            var taskListener = function( msg ) {
                if ( msg.cmd == ipcMessage.cmd && msg.task === ipcMessage.task && JSON.stringify( msg.payload ) === JSON.stringify( ipcMessage.payload ) ) {
                    res.send( { error: msg.error, result: msg.result } );

                    // Remove the listener
                    process.nextTick( function() {
                        process.removeListener( 'message', taskListener );
                    });
                }
            }

            process.on( 'message', taskListener );
            process.send( { cmd: 'backgroundTask', task: 'ExampleTask', payload: this.req.query } );
        }

    });
};