import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleItemPage } from './sale-item';

@NgModule({
  declarations: [
    SaleItemPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleItemPage),
  ],
})
export class SaleItemPageModule {}
