var config = require('./package');

module.exports = function(grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: config,

    uglify: {
      build: {
        src: 'dist/<%=pkg.name%>-<%=pkg.version%>/<%=pkg.name%>.js',
        dest: 'dist/<%=pkg.name%>-<%=pkg.version%>/<%=pkg.name%>.min.js',
      }
    },

    clean: [ 'dist/' ],

    copy: {
      examples: {
        src: 'examples/**',
        dest: 'dist/<%=pkg.name%>-<%=pkg.version%>/'
      },
      css: {
        src: 'css/**',
        dest: 'dist/<%=pkg.name%>-<%=pkg.version%>/'
      },
      files: {
        src: [ 'README.md', '*-LICENSE.txt'],
        dest: 'dist/<%=pkg.name%>-<%=pkg.version%>/'
      },
      js: {
        src: 'src/<%=pkg.name%>.js',
        dest: 'dist/<%=pkg.name%>-<%=pkg.version%>/<%=pkg.name%>.js',
        options: {
          process: function (content) {
            return content.replace(/@VERSION/g, config.version);
          }
        }
      }
    },

    zip: {
      dist: {
        cwd: 'dist/',
        src: 'dist/<%=pkg.name%>-<%=pkg.version%>/**',
        dest: 'dist/<%=pkg.name%>-<%=pkg.version%>.zip'
      }
    }
  });

  grunt.registerTask('default', ['clean', 'copy', 'uglify', 'zip' ]);

};
