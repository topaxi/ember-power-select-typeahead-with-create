# ember-power-select-typeahead-with-create

This addon combines the functionality of
[ember-power-select-typeahead](https://github.com/cibernox/ember-power-select-typeahead/)
and
[ember-power-select-with-create](https://github.com/cibernox/ember-power-select-with-create/).

## Installation

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

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
