import { helper } from '@ember/component/helper';

export function inputValidateClass(params/*, hash*/) {
  return `${(params[0] !== undefined ? ( params[0] ? 'is-invalid' : '' ) : '')} form-control`;
}

export default helper(inputValidateClass);
