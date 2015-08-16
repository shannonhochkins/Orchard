module.exports = function(grunt) {
	// Load NPM tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Enter the name of the file for the dashboard you want to generate

	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		compass: {
		    dist: {
		        options: {
			        sassDir: 'app/css/scss',
			        cssDir: 'app/css/main'
		        }
		    }
		},
		cssmin: {
		    main : {
		    	options: {
			    	restructuring: false
			    },
		    	files: [{
			    	expand: true,
			    	cwd: 'app/css/main',
			    	src: ['*main.css', '!*main.min.css'],
			    	dest: 'app/css/min',
			    	ext: '.min.css'
			    }]
		    }
		},
		express: {
			dev : {
			    options: {
			    	background: false,
			        script: 'server.js'
			    }
			}
		},
		uglify: {
			options : {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("mm-dd-yyyy") %> */',
				mangle : true,
				compress: {
					drop_console: false,
				}
			},
			// This will compile all files in the following folders to one file called 'main.min.js'
		    scripts: {
		      files: {
		        'app/js/dest/main.min.js': ['app/js/lib/*.js', 'app/js/lib/routing/*.js', 'app/js/lib/factories/*.js','app/js/lib/services/*.js','app/js/lib/directives/*.js','app/js/lib/controllers/*.js', '!*.min.js', '!Gruntfile.js'],
		        'app/js/dest/plugins.min.js' : ['app/js/lib/plugins/merge_plugins/*.js', 'app/js/lib/plugins/merge_plugins/**/*.js']
		      },
		    }
		},
		concurrent : {
			options: {
			    logConcurrentOutput: true
			},
			dev: {
			    tasks: ["watch", "express:dev"]
		    }
		},
		watch : {
			express: {
		      files:  [ '**/*.js' ],
		      tasks:  [ 'express:dev' ]
		    },
			scripts: {
			    files: ['app/js/lib/**/*.js', 'app/js/lib/*.js'],
			    tasks: ['uglify']
		  	},
		  	scss: {
			    files: ['app/css/scss/*.scss', 'app/css/scss/**/*.scss', 'app/css/shared/**/*.scss'],
			    tasks: ['compass'],
		  	},
		  	css: {
		    	files: ['app/css/main/*.css'],
		    	tasks: ['cssmin'],	
		  	}
		}
	});
	// Setup default task to initialize the watch function
	grunt.registerTask('default', ['concurrent:dev']);


}