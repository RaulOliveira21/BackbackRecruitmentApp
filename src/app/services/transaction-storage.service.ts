import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionStorageService {

  transactionList: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor() {
    console.log('STORAGE SERVICE');
  }

  getTransactionList() {
    return this.transactionList.asObservable();
  }

  updateTransactionList(transactionItem: any) {
    let currentTransactions = this.transactionList.value;
    currentTransactions.push(transactionItem);
    this.transactionList.next(currentTransactions);
  }

  setTransactionList(transactionsList: any) {
    this.transactionList.next(transactionsList);
  }

}
