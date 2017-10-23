import { helper } from '@ember/component/helper';

export function dateFormat(params/*, hash*/) {
  return moment(params[0]).format('DD/MM/YYYY');
}

export default helper(dateFormat);
