import {Component, EventEmitter, Inject, Injectable, OnInit, Output, ViewChild} from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {Observable} from "rxjs";
import {TransactionStorageService} from "../../services/transaction-storage.service";

export enum filters {
  date = 1,
  beneficiaries = 2,
  amount = 3
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  private transactionsBackup: any;
  public transactionsLog: any;
  public sortByDate = true;
  public sortByBeneficiaries = false;
  public sortByAmount = false;
  transactionItems: any;
  onSearch = new EventEmitter();
  onFilter = new EventEmitter();
  regex = / /g;

  @ViewChild('date') date;
  @ViewChild('beneficiaries') beneficiaries;
  @ViewChild('amount') amount;

  constructor(private transactionService: TransactionService,
              private transactionStorageService: TransactionStorageService) {

  }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((body: any) => {
        this.transactionItems = body.data;
        this.transactionsLog = body.data;
        this.transactionsBackup = body.data;
        this.transactionStorageService.setTransactionList(this.transactionItems);
        console.log('INIT', this.transactionItems)
      },
      error => {
        console.error(error)
      })

    this.transactionStorageService.getTransactionList().subscribe((data: any) => {
      if (this.transactionItems && this.transactionItems.length != data.length) {
        this.transactionItems = data;
      }

    })

  }

  handleSearch(text) {
    this.transactionsLog = this.transactionsBackup
    if (text.length === 0) {
      return;
    }
    this.transactionsLog = this.transactionsLog.filter(
      (trans: any) => trans.merchant.name.toLowerCase().indexOf(text) !== -1
    );
  }

  filter(value) {
    this.handleSort(value)
    this.onFilter.emit(value);
  }

  handleSort(type) {
    this.removeClassNativeElem();

    switch (type) {
      case filters.date:
        this.sortByDate = !this.sortByDate;
        //this.date.nativeElement.className = (this.sortByDate ? 'up' : 'down');
        this.handleSortDate();
        break;

      case filters.beneficiaries:
        this.sortByBeneficiaries = !this.sortByBeneficiaries;
        //this.beneficiaries.nativeElement.className = (this.sortByBeneficiaries ? 'up' : 'down');
        this.handleSortBeneficiaries()
        break;

      case filters.amount:
        this.sortByAmount = !this.sortByAmount;
        //this.amount.nativeElement.className = (this.sortByAmount ? 'up' : 'down');
        this.handleSortAmount()
        break;
    }

  }

  handleSortDate() {
    this.transactionItems = this.transactionItems.sort((log1: any, log2: any) => {
      if (this.sortByDate) {
        return new Date(log2.dates.valueDate).getTime() - new Date(log1.dates.valueDate).getTime();
      } else {
        return new Date(log1.dates.valueDate).getTime() - new Date(log2.dates.valueDate).getTime();
      }
    });
  }

  handleSortBeneficiaries() {
    this.transactionItems = this.transactionItems.sort((log1: any, log2: any) => {
      if (this.sortByBeneficiaries) {
        if (log1.merchant.name < log2.merchant.name) {
          return -1;
        }
        if (log1.merchant.name > log2.merchant.name) {
          return 1;
        }
        return 0
      }
    })
  }

  handleSortAmount() {
    this.transactionItems = this.transactionItems.sort((log1: any, log2: any) => {
      if (this.sortByAmount) {
        return parseFloat(log2.transaction.amountCurrency.amount) - parseFloat(log1.transaction.amountCurrency.amount);
      } else {
        return parseFloat(log1.transaction.amountCurrency.amount) - parseFloat(log2.transaction.amountCurrency.amount);
      }
    });
  }

  removeClassNativeElem() {
    this.date.nativeElement.className = '';
    this.beneficiaries.nativeElement.className = '';
    this.amount.nativeElement.className = '';

  }

}
