import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import {
  typeInSearch,
  clickTrigger,
  nativeMouseUp
} from 'ember-power-select/test-support/helpers';

module(
  'Integration | Component | power select typeahead with create',
  function(hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function() {
      this.actions = {};
      this.send = (actionName, ...args) =>
        this.actions[actionName].apply(this, args);
    });

    test('it renders without error', async function(assert) {
      assert.expect(0);

      this.actions.create = function() {};

      await render(hbs`
      {{power-select-typeahead-with-create oncreate=(action 'create')}}
    `);
    });

    test('typeahead works', async function(assert) {
      assert.expect(4);

      this.set('options', [
        { name: 'foo' },
        { name: 'bar' },
        { name: 'baz' },
        { name: 'qux' }
      ]);
      this.actions.create = function() {};

      await render(hbs`
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

      assert.equal(
        find('.ember-power-select-dropdown'),
        null,
        'The component is closed'
      );
      await typeInSearch('ba');
      assert.notEqual(
        find('.ember-power-select-dropdown'),
        null,
        'The component is opened'
      );
      await nativeMouseUp('.ember-power-select-option:nth-child(3)');
      assert.equal(
        find('.ember-power-select-dropdown'),
        null,
        'The component is closed again'
      );
      assert
        .dom('.ember-power-select-search-input')
        .hasValue('baz', 'The input contains the selected option');
    });

    test('it executes the oncreate callback', async function(assert) {
      assert.expect(1);

      this.actions.create = itemName => {
        assert.equal(itemName, 'Foo Bar');
      };

      await render(hbs`
      {{#power-select-typeahead-with-create
        options=items
        oncreate=(action "create")
        renderInPlace=true as |item|
        }}
        {{item.name}}
      {{/power-select-typeahead-with-create}}
    `);

      await clickTrigger();
      await typeInSearch('Foo Bar');
      await nativeMouseUp('.ember-power-select-option:nth-child(1)');
    });
  }
);
