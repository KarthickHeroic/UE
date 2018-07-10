import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalePosPage } from './sale-pos';

@NgModule({
  declarations: [
    SalePosPage,
  ],
  imports: [
    IonicPageModule.forChild(SalePosPage),
  ],
})
export class SalePosPageModule {}
