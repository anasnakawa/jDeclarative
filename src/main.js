  

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
  Declarative.version = _version;

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