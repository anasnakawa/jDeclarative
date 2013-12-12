 

  // class definition
  // ----------------
  // @param {dom} element
  // @param {object} options
  function Declarative( element, options ) {
    this.element = element;
    this.options = options;
  }


  Declarative.prototype.init = function() {
    var self = this
    , parsedAttribute = Declarative.parseBindings( this.element.getAttribute( this.options.attr ) );

    $.each( parsedAttribute, function( plugin, options ) {
      $( self.element )[ plugin ]( options );
    });
  };

  // store auto generated version
  Declarative.version = _version;

  // parse bindings
  // --------------
  // @param {string} attr 
  // @return {object} parsed binding
  Declarative.parseBindings = function( attr ) {
    var parsed;
    try {
      parsed = new Function( 'return { ' + attr + ' };' )();
    } catch( e ) {
      throw new Error( 'unable to parse binding: ' + attr + ' \n message: ' + e );
    }
    return parsed;
  }

  
  // default settings
  Declarative.defaults = {
    attr: 'data-plugin'
  };


  // jQuery plugin
  // -------------
  $.fn.declarative = function( options ) {

    // merge options
    options = $.extend( {}, Declarative.defaults, options );

    return this.each( function() {
      return $( this ).find( '[{attr}]'.replace( /{attr}/, options.attr ) ).each( function() {
        new Declarative( this, options ).init();
      });
    });   
  }

  // expose class
  // ------------
  $.Declarative = Declarative;
