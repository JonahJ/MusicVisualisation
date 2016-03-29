module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    grunt.initConfig({
        less: {
            run: {
                files: {
                    "build/style.css": "css/style.less"
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'js',
                    src: '**',
                    dest: 'build/js'
                }, {
                    expand: true,
                    cwd: 'html',
                    src: '**',
                    dest: 'build/'
                }, ]
            }
        },
        watch: {
            less: {
                files: ['css/**/*.less'],
                tasks: ['less']
            },
            default: {
                files: ['css/**/*.less', 'js/**/*.js', 'html/**/*.html'],
                tasks: ['less:run', 'copy:main']
            },
            options: {
                livereload: true,
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: "0.0.0.0",
                    base: 'build',
                    livereload: true,
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:<%= connect.server.options.port%>'
            }
        }
    });


    grunt.registerTask('default', ['less:run', 'copy:main',  'connect:server', 'open', 'watch:default']);


};
