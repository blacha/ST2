module.exports = function(grunt) {
    var webpack = require("webpack");
    var config = {};

    require('time-grunt')(grunt);

    // load all grunt tasks
    require('jit-grunt')(grunt);

    config.watch = {
        test: {
            files: ['test/**/*.ts', 'typings/**/*.ts'],
            tasks: ['typescript', 'package']
        },
        src: {
            files: ['src/**/*.ts'],
            tasks: ['typescript', 'package']
        },
        sass: {
            files: ['src/**/*.scss'],
            tasks: ['sass']
        }
    };

    config.ts = {
        default: {
            src: ['test/**/*.ts', 'src/**/*.ts'],
            dest: 'build/',
            options: {
                target: 'es5',
                module: 'commonjs',
                comments: false,
                sourcemap: true
            }
        }
    };

    config.webpack = {
        client: {
            entry: ['./build/src/web/main.js'],
            module: {
                loaders: []
            },
            output: {
                path: './static/lib/',
                filename: 'bundle.js',
                libraryTarget: 'umd',
                sourceMap: true
            },
            externals: [{
                'moment': true
            }]
        },
        cloud: {
            entry: ['./build/src/cloud/main.js'],
            module: {
                loaders: []
            },
            output: {
                path: './cloud/',
                filename: 'main.js',
                libraryTarget: 'umd'
            },
            externals: []
        },
        extension: {
            entry: ['./build/src/extension/main.js'],
            module: {
                loaders: []
            },
            output: {
                path: './build/',
                filename: 'extension.js',
                libraryTarget: 'umd',
                library: ['ST2']
            },
            externals: [{
                ClientLib: true
            }]
        }
    };

    // Install typescript definitions
    config.tsd = {
        install: {
            options: {
                command: 'reinstall',
                latest: false,
                config: './tsd.json'
            }
        }
    };

    config.tslint = {
        options: {
            configuration: grunt.file.readJSON('tslint.json')
        },
        files: {
            src: ['src/**/*.ts', 'test/**/*.ts']
        }
    };

    config.copy = {
        bower: {
            src: 'target/bundle.js',
            dest: 'target/main.js'
        },
        chrome: {
            files: [{
                flatten: true,
                expand: true,
                src: 'src/extension/package/chrome/*',
                dest: 'static/client/chrome/'
            }, {
                flatten: true,
                expand: true,
                src: 'static/client/st2.user.js',
                dest: 'static/client/chrome/'
            }]
        }
    };

    config.mochaTest = {
        test: {
            src: ['build/test/**/*.spec.js']
        }
    };

    config.includes = {
        js: {
            options: {
                includeRegexp: /^\/\/\s*import\s+['"]?([^'"]+)['"]?\s*$/,
                    duplicates: false,
                    debug: true,
                    includePath: './',
            },

            cwd: 'src/extension/package/',
            src: 'st2.user.js',
            dest: 'static/client/'
        }
    };

    config.sass = {
        options: {
            sourceMap: true
        },
        dist: {
            files: [{
                src: 'src/web/render/style.scss',
                dest: './static/lib/style.css'
            }]
        }
    };

    grunt.initConfig(config);

    grunt.registerTask('default', ['build', 'package', 'watch']);

    grunt.registerTask('typescript', ['ts', 'mochaTest']);

    grunt.registerTask('build', ['typescript', 'sass']);
    grunt.registerTask('package', ['webpack','includes', 'copy']);
};