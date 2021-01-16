import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() { }

  mapTransactionItem(formGroup: FormGroup) {
    var date = Date.now();
    var amountToTransfer = formGroup.get('amountToTransfer').value;
    var to = formGroup.get('to').value
    return {
      categoryCode: '#c12020',
      dates: {
        valueDate: date
      },
      transaction: {
        amountCurrency: {
          amount: amountToTransfer,
          currencyCode: 'USD'
        },
        type: 'Online Transfer',
        creditDebitIndicator: 'DBIT'
      },
      merchant: {
        name: to,
        accountNumber: 'SI64397745065188826'
      }
    }
  }

}
