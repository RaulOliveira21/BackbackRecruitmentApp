import {AbstractControl, ValidatorFn} from "@angular/forms";

export function invalidAmount(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return control.value <= 0 ?
      {'invalidAmount': true} :
      null;
  };
}
