module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-injector');

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);


    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'views',
        version: grunt.file.readJSON('package.json').version,
    };

    grunt.initConfig({
        yeoman: appConfig,
        bower: {
            install: {
                options: {
                    targetDir: appConfig.dist + '/bower_components'
                }
            }
        },
        bowercopy: {
            options: {
                srcPrefix: 'bower_components'
            },
            scripts: {
                options: {
                    destPrefix: '<%= yeoman.dist %>/bower_components'
                },
                files: {
                    'jquery/dist/jquery.js': 'jquery/dist/jquery.js',
                    'socket.io/lib/socket.js': 'socket.io/lib/socket.js'
                }
            }
        },
        injector: {
            options: {
                destFile: 'views/formulaire.html',
            },
            local_dependencies: {
                files: {
                    'index.html': ['bower.json'],
                }
            }
        }
    });

    grunt.registerTask('default', [
        'bowercopy',
        'injector'
    ]);
};