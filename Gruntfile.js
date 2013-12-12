/**
 * jDeclarative.js <https://github.com/anasnakawa/jDeclarative>
 * Copyright (c) Anas Nakawa <anas.nakawa@gmail.com>
 * released under the MIT License <http://opensource.org/licenses/MIT>
 */

module.exports = function( grunt ) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('bower.json')

		// mergin / auto injecting version number
		// --------------------------------------
		, concat: {
			options: {
				  banner: [
				    "/*!"
					, " * jDeclarative.js  v<%= pkg.version %> <https://github.com/anasnakawa/jDeclarative>"
					, " * Copyright (c) Anas Nakawa <%= grunt.template.today( 'yyyy' ) %> <anas.nakawa@gmail.com>"
					, " * released under the MIT License <http://opensource.org/licenses/MIT>"
					, " */"
					, ""
					, ""
			  	, "(function( $ ) {"
			  	, ""
			  	, "  'use strict';"
			  	, ""
			  	, "  // injecting version via grunt"
			  	, "  // ---------------------------"
			  	, "  var _version = '<%= pkg.version %>';"
		  		].join( "\n" )
				, footer: [
					  "" 
					, ""
					, "})( jQuery );"
				].join( "\n" )
			}
			, dist: {
				  src: [ 'src/main.js' ]
			    , dest: 'jDeclarative.js'
		    }
		}

		// minify
		// ------
		, uglify: {
			options: {
				preserveComments: 'some'
			}
			, jDeclarative: {
				files: {
					'jDeclarative.min.js': [ 'jDeclarative.js' ]
				}
			}
		}

	});

	// loading all grunt tasks
	require('load-grunt-tasks')(grunt);

	// default task
	grunt.registerTask( 'default', [ 'concat', 'uglify' ] );
}