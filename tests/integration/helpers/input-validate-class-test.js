
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('input-validate-class', 'helper:input-validate-class', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{input-validate-class inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

