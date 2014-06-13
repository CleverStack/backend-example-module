module.exports = function ( Model, config ) {
    return Model.extend( 'Example',
    {
        type: config['backend-example-module'].driver,
        softDeletable: true,
        timeStampable: true
    },
    {
        id: {
            type: Number,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: String,
            allowNull: false
        }
    });
};