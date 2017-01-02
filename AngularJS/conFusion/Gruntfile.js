'use strict';

module.exports = function (grunt) {

	// Required to find the time required to complete a task
	require('time-grunt')(grunt);
	// Required to load required Grunt tasks
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				src: [
					'Gruntfile.js',
					'app/scripts/{,*/}*.js'
				]
			}
		},

		copy: {
			dist: {
				cwd: 'app',
				src: ['**', '!styles/**/*.css','!scripts/**/*.js'],
				dest: 'dist',
				expand: true
			},
			fonts: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: 'bower_components/bootstrap/dist',
						src: ['fonts/*.*'],
						dest: 'dist'
					}, 
					{
						expand: true,
						dot: true,
						cwd: 'bower_components/font-awesome',
						src: ['fonts/*.*'],
						dest: 'dist'
					}
				]
			}
		},

		clean: {
			build: {
				src: [ 'dist/' ]
			}
		},

		useminPrepare: {
			html: 'app/menu.html',
			options: {
				dest: 'dist'
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			dist: {}
		},

		uglify: {
			dist: {}
		},

		cssmin: {
			dist: {}
		},

		filerev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 20
			},
			release: {
				files: [{
					src: [
						'dist/scripts/*.js',
						'dist/styles/*.css'
					]
				}]
			}
		},

		usemin: {
			html: ['dist/*.html'],
			css: ['dist/styles/*.css'],
			options: {
				assetsDirs: ['dist', 'dist/styles']
			}
		},

		watch: {
		  copy: {
		    files: [ 'app/**', '!app/**/*.css', '!app/**/*.js'],
		    tasks: [ 'build' ]
		  },
		  
		  scripts: {
		    files: ['app/scripts/app.js'],
		    tasks:[ 'build']
		  },
		  
		  styles: {
		    files: ['app/styles/mystyles.css'],
		    tasks:['build']
		  },
		  
		  livereload: {
		    options: {
		      livereload: '<%= connect.options.livereload %>'
		    },
		    
		    files: [
		      'app/{,*/}*.html',
		      '.tmp/styles/{,*/}*.css',
		      'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
		    ]
		  }
		},

		connect: {
		  options: {
		    port: 9000,
		    // Change this to '0.0.0.0' to access the server from outside.
		    hostname: 'localhost',
		    livereload: 35729
		  },
		  
		  dist: {
		    options: {
		      open: true,
		      base:{
		        path: 'dist',
		        options: {
		          index: 'menu.html',
		          maxAge: 300000
		        }
		      }
		    }
		  }
		}
	});

	// Tasks

	grunt.registerTask('build', [
		'clean',
		'jshint',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'copy',
		'filerev',
		'usemin'
	]);

	grunt.registerTask('default', [
		'build'
	]);

	grunt.registerTask('serve', [
		'build',
		'connect:dist',
		'watch'
	]);
};