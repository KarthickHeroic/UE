import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesPosPage } from './sales-pos';

@NgModule({
  declarations: [
    SalesPosPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesPosPage),
  ],
})
export class SalesPosPageModule {}
