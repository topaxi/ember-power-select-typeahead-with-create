# ember-power-select-typeahead-with-create

[![Build Status](https://travis-ci.org/topaxi/ember-power-select-typeahead-with-create.svg?branch=master)](https://travis-ci.org/topaxi/ember-power-select-typeahead-with-create)

This addon combines the functionality of
[ember-power-select-typeahead](https://github.com/cibernox/ember-power-select-typeahead/)
and
[ember-power-select-with-create](https://github.com/cibernox/ember-power-select-with-create/).


```bash
ember install ember-power-select-typeahead-with-create
```

## Usage

```hbs
{{#power-select-typeahead-with-create
    search=(action 'searchAsync')
    extra=(hash labelPath='name')
    options=countries
    selected=selectedCountry
    onchange=(action (mut selectedCountry))
    oncreate=(action 'createCountry') as |country|
}}
  {{country.name}}
{{/power-select-typeahead-with-create}}
```

## Styles

In your app's stylesheet, you must import the built-in styles in this order:

```css
/*
your custom variables goes here
*/

/*if using a theme
@import 'ember-power-select/themes/material';
*/

@import 'power-select';
@import 'ember-power-select-typeahead';
```

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
