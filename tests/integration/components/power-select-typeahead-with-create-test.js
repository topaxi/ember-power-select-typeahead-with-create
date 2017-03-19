import Ember from 'ember';
import $ from 'jquery';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  typeInSearch,
  clickTrigger,
  nativeMouseUp
} from '../../helpers/ember-power-select';

moduleForComponent('power-select-typeahead-with-create', 'Integration | Component | power select typeahead with create', {
  integration: true
});

test('it renders without error', function(assert) {
  assert.expect(0);

  this.on('create', function() {});

  this.render(hbs`
    {{power-select-typeahead-with-create oncreate=(action 'create')}}
  `);
});

test('typeahead works', function(assert) {
  assert.expect(4);

  this.set('options', [
    { name: 'foo' },
    { name: 'bar' },
    { name: 'baz' },
    { name: 'qux' }
  ]);
  this.on('create', function() {});

  this.render(hbs`
    {{#power-select-typeahead-with-create
      searchField='name'
      extra=(hash labelPath='name')
      selected=selected
      options=options
      onchange=(action (mut selected))
      oncreate=(action 'create')
      as |option|}}
      {{option.name}}
    {{/power-select-typeahead-with-create}}
  `);

  assert.equal($('.ember-power-select-dropdown').length, 0, 'The component is closed');
  typeInSearch('ba');
  assert.equal($('.ember-power-select-dropdown').length, 1, 'The component is opened');
  nativeMouseUp('.ember-power-select-option:nth-child(3)');
  assert.equal($('.ember-power-select-dropdown').length, 0, 'The component is closed again');
  assert.equal(this.$('.ember-power-select-search-input').val(), 'baz', 'The input contains the selected option');
});

test('it executes the oncreate callback', function(assert) {
  assert.expect(1);

  this.on('create', itemName => {
    assert.equal(itemName, 'Foo Bar');
  });

  this.render(hbs`
    {{#power-select-typeahead-with-create
      options=items
      oncreate=(action "create")
      renderInPlace=true as |item|
      }}
      {{item.name}}
    {{/power-select-typeahead-with-create}}
  `);

  clickTrigger();
  Ember.run(() => typeInSearch('Foo Bar'));
  nativeMouseUp('.ember-power-select-option:nth-child(1)');
});
