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
        }

    });
};