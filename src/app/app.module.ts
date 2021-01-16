import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CardComponent} from './components/card/card.component';
import {TransferComponent} from './components/transfer/transfer.component';
import {TransactionComponent} from './components/transaction/transaction.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";
import {TransactionService} from "./services/transaction.service";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {MapperService} from "./services/mapper.service";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    TransferComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    TransactionService,
    MapperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
