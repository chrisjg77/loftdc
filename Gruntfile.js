var fs = require('fs')
  , growl = require('growl')
  ;

// Settings.
var server = 'server.js';
var livereload = false;
var restart_delay = 1000;

module.exports = function (grunt) {
  grunt.initConfig({
    concurrent: {
      compress: ['less'],
      start: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: server,
        options: {
          env: {
            NODE_ENV: 'development'
          },
          ignore: ['node_modules/**', 'public/**'],
          ext: 'js,hbs,yml',
          callback: function (nodemon) {
            nodemon.on('restart', function () {
              setTimeout(function () {
                fs.writeFileSync('.rebooted', 'rebooted');
              }, restart_delay);
            });
          }
        }
      }
    },
    less: {
      style: {
        files: {
          'public/css/style.css': 'public/less/style.less'
        },
        options: {
          compress: true,
          sourceMap: true,
          sourceMapFilename: 'public/css/style.css.map',
          sourceMapURL: '/css/style.css.map',
          sourceMapBasepath: 'public',
          sourceMapRootpath: '/'
        }
      }
    },
    watch: {
      css: {
        files: ['public/less/*.less'],
        tasks: ['less:style'],
        options: {
          livereload: livereload
        }
      },
      public: {
        files: ['public/**'],
        options: {
          livereload: livereload
        }
      },
      server: {
        files: ['.rebooted'],
        options: {
          livereload: livereload
        }
      }
    }
  });

  // Load deps.
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');

  // Register tasks.
  grunt.registerTask('default', 'concurrent');
  grunt.registerTask('dev', 'concurrent');
  grunt.registerTask('prod', 'less');

  // Check for errors and run a system growl notification.
  ['warn', 'fatal'].forEach(function (level) {
    grunt.util.hooker.hook(grunt.fail, level, function (opt) {
      growl(opt.name, {
        title: opt.message,
        image: 'Console'
      });
    });
  });
};
