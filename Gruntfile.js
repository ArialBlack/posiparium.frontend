module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        svgstore: {
            logos: {
                files: {
                    'assets/images/svg-images-sprite.svg': 'assets/images/svg/logo/*.svg'
                    //use like <span class="svg-image logo"><svg preserveAspectRatio="xMidYMid" focusable="false"><use xlink:href="/app-assets/images/svg-images-sprite.svg#bihus-logo"></use></svg></span>
                }
            }
        },

        bake: {
            your_target: {
                options: {
                },

                files: {
                    "index.html": "src/index.html",
                }
            }
        },

        sass: {
            options: {
                precision: 6,
                sourcemap: 'auto',
                sourceComments: 'true',
                style: 'expanded',
                trace: true,
                bundleExec: true
            },
            main: {
                files: {
                    'assets/css/style.css': 'assets/scss/style.scss'
                }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },

            svgstore: {
                files: [
                    'assets/images/svg/logo/*.svg'
                ],
                tasks: [ 'svgstore']
            },

            bake: {
               files: [
                    'src/**/*.html'
                ],
                tasks: ['bake']
            },

            sass: {
                files: [
                    'assets/scss/**/*.scss'
                ],
                tasks: ['sass']
            }
        },

        browserSync: {
            bsFiles: {
                src : [
                    'assets/css/**/*.css',
                    '*.html',
                ]
                },
            options: {
                watchTask: true,
                server: './'
            }
        }

    });

    // load npm modules
    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
   // grunt.loadNpmTasks('grunt-svgstore');

    grunt.registerTask('default', [/*'svgstore',  */ 'bake', 'sass:main', 'browserSync', 'watch']);
};
