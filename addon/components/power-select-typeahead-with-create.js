import layout from '../templates/components/power-select-typeahead-with-create';
import PowerSelectTypeahead from 'ember-power-select-typeahead/components/power-select-typeahead';
import { defaultMatcher } from 'ember-power-select/utils/group-utils';

export default PowerSelectTypeahead.extend({
  layout,
  matcher: defaultMatcher,
});
