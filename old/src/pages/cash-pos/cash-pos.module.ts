import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CashPosPage } from './cash-pos';

@NgModule({
  declarations: [
    CashPosPage,
  ],
  imports: [
    IonicPageModule.forChild(CashPosPage),
  ],
})
export class RptCashPageModule {}
