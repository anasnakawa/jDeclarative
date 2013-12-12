  

  // string tiny template
  // --------------------
  // parse a given template and repalce any variables wrapped with brackets '{' & '}' with the
  // corresponding object found in the passed context param
  // * **param:** {string} template    sting template to be parsed
  // * **param:** {object} context     object containing variables to inject into the template
  //
  // e.g: parse( 'hello my name is {name}, I am a {title}', { 
  //      name: 'Anas Nakawa'
  //      title: function() {
  //          return 'software developer'
  //      }
  // });     
  // >> 'hello my name is Anas Nakawa, I am a software developer'
  function parse( template, context ) {
    return template.replace(/{([A-Za-z0-9_$\-]*)}/g, function(token, match){
      if( !match in context ) {
        return;
      }
      return ( typeof context[match] === 'function' ) ? context[match]() : context[match];
    });
  }

  // parse bindings
  // --------------
  function parseBindings( attr ) {
    var parsed;
    try {
      parsed = new Function( 'return { ' + attr + ' };' )();
    } catch( e ) {
      throw new Error( parse( 'unable to parse binding: {binding} \n message: {error}', {
          binding: attr
        , error: e
      } ) );
    }
    return parsed;
  }

  // class definition
  // ----------------
  function Declarative( element, options ) {
    this.element = element;
    this.options = options;
    this.version = _version;

    // initialize
    this.init();
  }

  // store auto generated version
  Declarative.version = _version;

  // default settings
  Declarative.defaults = {
    attr: 'data-plugin'
  };  

  Declarative.prototype.init = function() {
    var self = this
    , parsedAttribute = parseBindings( this.element.getAttribute( this.options.attr ) );

    $.each( parsedAttribute, function( plugin, options ) {
      // debugger;
      $( self.element )[ plugin ]( options );
    });
  };

  $.fn.declarative = function( options ) {

    // merge options
    options = $.extend( Declarative.defaults, options );

    return this.each( function() {
      return $( this ).find( '[{attr}]'.replace( /{attr}/, options.attr ) ).each( function() {
        new Declarative( this, options );
      });
    });   
  }

  // expose class
  // ------------
  $.Declarative = Declarative;
