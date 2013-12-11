/**
 * jDeclarative.js <https://github.com/anasnakawa/jDeclarative>
 * Copyright (c) Anas Nakawa <anas.nakawa@gmail.com>
 * released under the MIT License <http://opensource.org/licenses/MIT>
 */

(function($) {

	'use strict';

	// parse bindings
	// --------------
	function parseBindings( attr ) {
		return new Function( 'return { ' + attr + ' };' )();
	}

	// class definition
	// ----------------
	function Declarative( element, options ) {
		this.element = element;
		this.options = options;

		// initialize
		this.init();
	}

	// default settings
	Declarative.defaults = {};


	Declarative.prototype.init = function() {
		
	};

	$.declarative = {
		defaults: Declarative.defaults
	};

	$.fn.declarative = function( options ) {
		
		// merge options
		options = $.extend( $.declarative.defaults, options );

		return this.each( function() {
			new Declarative( this, options );
		});		
	}

})(jQuery);