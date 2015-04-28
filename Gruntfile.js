module.exports = function(grunt) {
	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	  // Time how long tasks take. Can help when optimizing build times
//	require('time-grunt')(grunt);
	
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		less : {
			development : {
				files : [ {
					src : [ 'styles/*.less' ],
					dest : 'styles/style.css'
				} ]
			},
		},
		// Empties folders to start fresh
	    clean: {
	      dist: {
	        files: [{
	            dot: true,
	            src: [
	              '.tmp',
	              'dist/{,*/}*',
	              '!dist/.git{,*/}*'
	            ]
	          }]
	      },
	      server: '.tmp'
	    },
		connect : {
			options : {
				port : 9000,
				hostname : 'localhost', // 默认就是这个值，可配置为本机某个 IP，localhost 或域名
				livereload : 35729
			// 声明给 watch 监听的端口
			},
			server : {
				options : {
					open : true, // 自动打开网页 http://
					base : [ '' // 主目录
					]
				}
			},
			test: {
		        options: {
		          port: 9001,
		          middleware: function (connect) {
		            return [
		              connect.static('.tmp'),
		              connect.static('test'),
		              connect().use(
		                      '/bower_components',
		                      connect.static('./bower_components')
		                      ),
		              connect.static(require('./bower.json').appPath || 'app')
		            ];
		          }
		        }
		      }
		},
		//自动将bower中的包引入到index.html中
		//For JavaScript dependencies, pop this in your HTML file:
		//<!-- bower:js -->
		//<!-- endbower -->
		wiredep : {
			app: {
		        src: ['index.html']
		    }
		},
		copy : {
			main : {
				files : [{
						expand: true, 
						src: ['data/**'], 
						dest: 'dist'
					},{
						expand: true, 
						src: ['images/**'], 
						dest: 'dist'
					}
//					,{
//						expand: true, 
//						src: ['scripts/**'], 
//						dest: 'dist'
//					}
//					,{
//						expand: true, 
//						src: ['styles/**'], 
//						dest: 'dist'
//					}
					,{
						expand: true, 
						src: ['templates/**'], 
						dest: 'dist',
						encoding : 'utf-8'
					},{
						expand: true, 
						src: ['views/**'], 
						dest: 'dist'
					},{
						expand: true, 
						src: ['index.html'], 
						dest: 'dist'
					}, {
			            expand: true,
			            cwd: 'bower_components/bootstrap/dist',
			            src: 'fonts/*',
			            dest: 'dist'
			        }
				]
			}
		},
		useminPrepare: {
	      html: 'index.html',
	      options: {
	        dest: 'dist',
	        flow: {
	          html: {
	            steps: {
	              js: ['concat', 'uglifyjs'],
	              css: ['cssmin']
	            },
	            post: {}
	          }
	        }
	      }
	    },
	 // Renames files for browser caching purposes
	    filerev: {
	      dist: {
	        src: [
	          'dist/scripts/{,*/}*.js',
	          'dist/styles/{,*/}*.css',
	         // 'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
	          'dist/styles/*'
	        ]
	      }
	    },
	    // Performs rewrites based on filerev and the useminPrepare configuration
	    usemin: {
	      html: ['dist/{,*/}*.html'],
	      css: ['dist/styles/{,*/}*.css'],
	      options: {
	        assetsDirs: ['dist', 'dist/images']
	      }
	    },
	    htmlmin: {
	        dist: {
	          options: {
	            collapseWhitespace: true,
	            conservativeCollapse: true,
	            collapseBooleanAttributes: true,
	            removeCommentsFromCDATA: true,
	            removeOptionalTags: true
	          },
	          files: [{
	              expand: true,
	              cwd: 'dist',
	              src: ['*.html', 'views/{,*/}*.html','templates/{,*/}*.html'],
	              dest: 'dist'
	            }]
	        }
	      },
	      // unit-test settings
	    karma: {
	        unit: {
	        	configFile: 'test/karma-conf.js',
	        	singleRun: false
	        }
	    },
		watch : {
			styles : {
				// Which files to watch (all .less files recursively in the less
				// directory)
				files : [ 'styles/*.less' ],
				tasks : [ 'less' ],
				options : {
					forceWatchMethod : 'old',
					debounceDelay : 10,
					livereload : true
				}
			},
			livereload : {
				options : {
					livereload : '<%=connect.options.livereload%>' // 监听前面声明的端口
																	// 35729
				},

				files : [ // 下面文件的改变就会实时刷新网页
				'*.html', 'views/*.html', 'styles/*.css', 'scripts/*.js',
						'scripts/controllers/*.js' ]
			}

		}
	});
	grunt.registerTask('serve', [ 'connect:server', 'watch' ]);
	grunt.registerTask('build', [ 'clean','wiredep','useminPrepare','concat','copy' ,'cssmin','uglify','filerev','usemin','htmlmin']);
	grunt.registerTask('test', ['karma']);
};