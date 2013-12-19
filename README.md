jDeclarative
============

declarative jquery plugins in your markup

### Declaring plugins

just provide a `data-plugin` attribute in your markup to any element you wish to bind a jQuery plugin to it, writing an object literal into the attribute to specify plugin name / options

**you write this..**

```html
<input type="text" data-plugin="datepicker: { showButtonPanel: true, minDate: -20, maxDate: '+1M +10D' }" />
```

**instead of this..**
```html
<input id="datepickerInput" type="text" />
```

```js
$('#datepickerInput').datepicker({
  minDate: -20, 
  maxDate: '+1M +10D',
  showButtonPanel: true
});
```

**you can bind multiple plugins on the same element**

```html
<input type="text" placeholder="country lookup" data-plugin="placeholder: {}, autocomplete: { source: [ 'Jordan', 'Syria', 'Egypt', 'Palestine', 'Turkey' ] }" />
```

### Why 

- easier to inspect which element has a plugin, rather than looking up js / html files to figure out what plugin / dom elements relation
- works with all jQuery plugins!


### Credits

inspired by KnockoutJs library
