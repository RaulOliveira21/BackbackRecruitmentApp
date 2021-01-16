import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {overdraftLimit} from "../../validators/overdraft-limit.directive";
import {invalidAmount} from "../../validators/invalid-amount.directive";
import {TransactionService} from "../../services/transaction.service";
import {MapperService} from "../../services/mapper.service";
import {TransactionStorageService} from "../../services/transaction-storage.service";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  myForm: FormGroup;
  accountBalance: number = 5824.76;
  overdraftLimit: number = 500;


  constructor(private fb: FormBuilder, private mapperService: MapperService, private transactionStorageService: TransactionStorageService) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      from: [{
        value: "Free Checking(4692) - $" + this.accountBalance,
        disabled: true
      }],
      to: ['', Validators.required],
      amountToTransfer: ['', Validators.compose([
        Validators.required,
        overdraftLimit(this.overdraftLimit, this.accountBalance),
        invalidAmount()
      ])],
    })
  }

  print() {
    console.log(this.myForm)
  }

  onSubmit() {
    this.myForm.get('to').disable();
    this.myForm.get('amountToTransfer').disable();
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('transferBtn').style.display = 'inline-block';
  }

  onTransfer() {
    let mappedTransfer = this.mapperService.mapTransactionItem(this.myForm);
    this.transactionStorageService.updateTransactionList(mappedTransfer);
    this.myForm.reset();
    this.myForm.get('to').enable();
    this.myForm.get('amountToTransfer').enable();
    this.myForm.get('from').setValue('Free Checking(4692) - $'+ this.accountBalance )
    document.getElementById('submitBtn').style.display = 'inline-block';
    document.getElementById('transferBtn').style.display = 'none';
  }


}
