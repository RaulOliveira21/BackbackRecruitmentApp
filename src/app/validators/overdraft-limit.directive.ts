import {AbstractControl, ValidatorFn} from "@angular/forms";

export function overdraftLimit(overdraftLimitAmount: number, availableBalance: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return availableBalance - control.value < overdraftLimitAmount * -1 ?
      {'overdraftLimit': true} :
      null;
  };
}

