 

  // Declarative
  // ===========
  // @param {dom} element
  // @param {object} options
  function Declarative( element, options ) {
    this.element = element;
    this.options = options;

    // initialize
    this.init();
  }

  // init
  // ====
  // initialize Declarative on current dom element scope
  // will lookup for any element that has a declarative attribute
  Declarative.prototype.init = function() {
    var self = this
    , parsedAttribute = Declarative.parseBindings( this.element.getAttribute( this.options.attr ) );

    $.each( parsedAttribute, function( plugin, options ) {
      $( self.element )[ plugin ]( options );
    });
  };

  // version
  // =======
  // inject auto generated version
  // read by grunt from `bower.json` file
  Declarative.version = _version;

  // parseBindings
  // =============
  // parse declarative attribute to return an object literal
  // containing plugin names as a key, plugin options as a value
  // -----------------------------------------------------------
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
  
  // defaults
  // ========
  // declarative global default settings
  Declarative.defaults = {
    attr: 'data-plugin'
  };

  // jQuery API
  // ==========
  // plugin definition
  $.fn.declarative = function( options ) {

    // merge options
    options = $.extend( {}, Declarative.defaults, options );

    return this.each( function() {
      return $( this ).find( '[{attr}]'.replace( /{attr}/, options.attr ) ).each( function() {
        new Declarative( this, options );
      });
    });   
  }

  // expose class to public API
  $.Declarative = Declarative;
