module.exports = function(grunt) {
    var webpack = require("webpack");
    var config = {};

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

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
        default: {
            entry: ['./build/src/main.js'],
            module: {
                loaders: []
            },
            output: {
                path: './static/lib/',
                filename: 'bundle.js',
                libraryTarget: 'umd',
            },
            externals: [{
                'moment': true
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
        }
    };

    config.mochaTest = {
        test: {
            src: ['build/test/**/*.spec.js']
        }
    };

    config.sass = {
        options: {
            sourceMap: true
        },
        dist: {
            files: [{
                src: 'src/render/style.scss',
                dest: './static/lib/style.css'
            }]
        }
    };

    grunt.initConfig(config);

    grunt.registerTask('default', ['build', 'package', 'watch']);

    grunt.registerTask('typescript', ['ts', 'mochaTest']);

    grunt.registerTask('build', ['typescript']);
    grunt.registerTask('package', ['webpack', 'copy']);
};