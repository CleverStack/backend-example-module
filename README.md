CleverStack Example Backend Module
====================
[![NPM version](https://badge.fury.io/js/backend-example-module.png)](http://badge.fury.io/js/backend-example-module) [![GitHub version](https://badge.fury.io/gh/cleverstack%2Fbackend-example-module.png)](http://badge.fury.io/gh/cleverstack%2Fbackend-example-module) [![Dependency Status](https://david-dm.org/CleverStack/backend-example-module.png)](https://david-dm.org/CleverStack/backend-example-module) [![devDependency Status](https://david-dm.org/CleverStack/backend-example-module/dev-status.png)](https://david-dm.org/CleverStack/backend-example-module#info=devDependencies) [![Code Climate](https://codeclimate.com/github/CleverStack/backend-example-module.png)](https://codeclimate.com/github/CleverStack/backend-example-module) [![Build Status](https://secure.travis-ci.org/CleverStack/backend-example-module.png?branch=master)](https://travis-ci.org/CleverStack/backend-example-module) [![Coverage](https://codeclimate.com/github/CleverStack/backend-example-module/coverage.png)](https://codeclimate.com/github/CleverStack/backend-example-module) [![NPM downloads](http://img.shields.io/npm/dm/backend-example-module.png)](https://www.npmjs.org/package/backend-example-module) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/) 

![CleverStack NodeJS Example Module](http://cleverstack.github.io/assets/img/logos/node-seed-logo-clean.png "CleverStack NodeJS Example Module")
<blockquote>
This CleverStack module is designed to help show you how to make backend modules that are cleverstack supported.
</blockquote>

## Documentation

See [cleverstack.io](http://cleverstack.io/documentation/#backend) for more detailed information on the Node seed or visit the [Getting Started Guide](http://cleverstack.io/getting-started/)

## Configuration
Simply add the following config to your /config/local.json (or into your global.json for all environments, or in whatever environment you are using).

### Configuration files

```
{
    "backend-example-module": {
        "driver": "ORM"
    },
    "clever-background-tasks": {
        "enabled" : true,
        "interval": 2500,
        "tasks":[
            { "name": "ExampleTask", "parallel": true, "numWorkers": 2 }
        ],
        "driver": "redis",
        "redis": {
            "host": "localhost",
            "port": "11211"
        }
    }
}
```

## Setup

### Using CLI
1. Run `clever install backend-example-module` and follow the prompts
2. Run `clever serve` to start your application.

### Without CLI
1. Clone this repo (or untar it there) into your modules folder (ie modules/backend-example-module)
2. Add 'backend-example-module' to the bundledDependencies array of your app's package.json.
6. Run `grunt server` to start your application.