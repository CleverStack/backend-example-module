module.exports = function ( Service, ExampleModel ) {
    return Service.extend({
        model: ExampleModel
    });
};