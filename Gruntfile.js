module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				}
			},
			files: ['js/**/*.js']
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/base.css' : 'scss/base.scss'
				}
			},
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'css/base.css' : 'scss/base.scss'
				}
			}
		},
		watch: {
			scripts: {
				files: ['**/*.js'],
				tasks: ['jshint']
			},
			css : {
				files: ['**/*.scss'],
				tasks: ['sass:dev']
			}
		}
	});

	// Load any plugins we need
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Set up any tasks here
	grunt.registerTask('default', ['jshint', 'sass:dist']);
	grunt.registerTask('dev', ['jshint', 'sass:dev']);
}