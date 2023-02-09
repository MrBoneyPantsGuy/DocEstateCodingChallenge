import { AbstractControl } from '@angular/forms';

/** Custom Form Validators for the creation of new Property Objects */

export function noWhitespaceValidator(control: AbstractControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}

export function noSpecialCharactersValidator(control: AbstractControl) {
  const forbiddenCharacters = /[\/\\_*#]+/;
  const isValid = !forbiddenCharacters.test(control.value);
  return isValid ? null : { specialCharacters: true };
}
