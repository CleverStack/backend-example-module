var expect      = require( 'chai' ).expect
  , async       = require( 'async' )
  , sinon       = require( 'sinon' )
  , underscore  = require( 'underscore' )
  , path        = require( 'path' )
  , util        = require( 'util' )
  , injector    = require( 'injector' )
  , models      = [ { name: 'Example 1' } ]
  , ExampleController;

describe ( 'ExampleController', function () {

    before( function( done ) {
        ExampleController = injector.getInstance( 'backendExampleModule' ).controllers.ExampleController;
        done();
    });

    function fakeRequest( req ) {
        req.method  = req.method || 'GET';
        req.uri     = req.uri || '/example';
        req.query   = req.query || {};
        req.body    = req.body || {};
        req.params  = req.params || {};

        return req;
    };

    function fakeResponse( cb ) {
        return {
            json: function( code, message ) {
                setTimeout( function() {
                    cb( code, JSON.parse( JSON.stringify( message ) ) )                    
                }, 10 );
            },

            send: function( code, message ) {
                setTimeout( function() {
                    cb( code, message )
                }, 10 );
            }
        };
    };

    it( 'Should create a new example model instance and save it in the database', function( done ) {
        var ctrl = null
          , model = models[ 0 ];

        var req = fakeRequest({
            method: 'POST',
            body: underscore.extend( {}, model )
        });

        var res = fakeResponse( function( code, result ) {
            expect( code ).to.equal( 200 );
            expect( result ).to.be.an( 'object' );
            expect( ctrl.action ).to.equal( 'postAction' );

            expect( result ).to.have.property( 'id' );
            expect( result ).to.have.property( 'name', model.name );
            expect( result ).to.have.property( 'createdAt' );
            expect( result ).to.have.property( 'updatedAt' );
            
            model.id = result.id;
            model.createdAt = result.createdAt;
            model.updatedAt = result.updatedAt;
            model.deletedAt = null;

            done();
        });

        this.timeout( 10000 );
        var ctrl = ExampleController.callback( 'newInstance' )( req, res );
    });

    it( 'Should list the example model instances', function( done ) {
        var ctrl  = null
          , model = models[ 0 ];

        var req = fakeRequest({});
        var res = fakeResponse( function( code, result ) {
            expect( code ).to.equal( 200 );
            expect( result ).to.be.an( 'array' );
            expect( ctrl.action ).to.equal( 'listAction' );
            expect( result.length ).to.not.equal( 0 );

            var lastModel = result[ result.length - 1 ];
            expect( lastModel ).to.have.property( 'id' );
            expect( lastModel ).to.have.property( 'name' );
            expect( lastModel ).to.have.property( 'createdAt' );
            expect( lastModel ).to.have.property( 'updatedAt' );
            expect( lastModel ).to.have.property( 'deletedAt' );

            expect( lastModel.name ).to.eql( model.name );

            done();
        });

        this.timeout( 10000 );
        var ctrl = ExampleController.callback( 'newInstance' )( req, res );
    });

    it( 'Should be able to list an example by id', function( done ) {
        var ctrl  = null
          , model = models[ 0 ];

        var req = fakeRequest({
            uri: '/example',
            params: {
                id: model.id
            }
        });
        var res = fakeResponse( function( code, result ) {
            expect( code ).to.equal( 200 );
            expect( result ).to.be.an( 'object' );
            expect( ctrl.action ).to.equal( 'getAction' );
            expect( result ).to.eql( model );

            done();
        });

        this.timeout( 10000 );
        var ctrl = ExampleController.callback( 'newInstance' )( req, res );
    });

    it( 'Should be able to update an example model instance', function( done ) {
        var ctrl = null
          , model = models[ 0 ];

        model.name = 'Example 1 Updated';

        var req = fakeRequest({
            method: 'POST',
            body: underscore.extend( {}, model )
        });

        var res = fakeResponse( function( code, result ) {
            expect( code ).to.equal( 200 );
            expect( result ).to.be.an( 'object' );
            expect( ctrl.action ).to.equal( 'putAction' );

            expect( result ).to.have.property( 'updatedAt' );
            model.updatedAt = result.updatedAt;

            expect( result ).to.eql( model );

            done();
        });

        this.timeout( 10000 );
        var ctrl = ExampleController.callback( 'newInstance' )( req, res );
    });

    it( 'Should be able to delete an example model instance', function( done ) {
        var ctrl  = null
          , model = models[ 0 ];

        var req = fakeRequest({
            uri: '/example/' + model.id,
            params: {
                id: model.id
            },
            method: 'DELETE'
        });
        var res = fakeResponse( function( code, result ) {
            expect( code ).to.equal( 200 );
            expect( result ).to.eql({});

            done();
        });

        this.timeout( 10000 );
        var ctrl = ExampleController.callback( 'newInstance' )( req, res );
    });

});