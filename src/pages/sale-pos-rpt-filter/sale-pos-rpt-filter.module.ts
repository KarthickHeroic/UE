import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalePosRptFilterPage } from './sale-pos-rpt-filter';

@NgModule({
  declarations: [
    SalePosRptFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(SalePosRptFilterPage),
  ],
})
export class SalePosRptFilterPageModule {}
