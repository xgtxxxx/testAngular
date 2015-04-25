module.exports = function(grunt) {
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
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('serve', [ 'connect:server', 'watch' ]);
};