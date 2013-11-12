module.exports = function(grunt) {
	var pkg = grunt.file.readJSON('package.json'),
		scripts = ['js/**/*.js', '!**/*.min.js', '!node_modules/**/*.js'],
		paths = {
			min: 'build/js/app.min.js',
			scss: 'scss/',
			css: 'css/'
		}, 
		config = {
			pkg: pkg,
			scripts : scripts,
			paths : paths,
			jshint: {
				options: { jshintrc: '.jshintrc' },
				all: scripts
			},
			uglify : {
				options: { compress: { unsafe : false } },
				dist: {
					options: {
						banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.author %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n'
					},
					src: '<%= scripts %>',
					dest: paths.min
				},
			},

			concat: {
				options: {
					separator: ';',
				},
				dist: {
					src: '<%= scripts %>',
					dest: 'build/app.js'
				}
			},

			sass: {
				dist: {
					options: {
						style: 'compressed'
					},
					files: {
						'build/css/base.css' : 'scss/base.scss'
					}
				},
				dev: {
					options: {
						style: 'expanded'
					},
					files: {
						'build/css/base.css' : 'scss/base.scss'
					}
				},
			},

			watch: {
				tasks: ['dev'],
				files: [scripts, 'Gruntfile.js', 'scss/**/*.scss'] //If we add Gruntfile.js to the watch task, it'll rerun when we make changes
			}
		};

	grunt.initConfig(config);

	// grunt.loadNpmTasks('grunt-contrib-jshint');
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', ['jshint', 'uglify', 'sass:dist']);
	grunt.registerTask('dev', ['jshint', 'concat', 'sass:dev']);
	// grunt.registerTask('watch', ['default']);
};