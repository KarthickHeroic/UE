import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShiftPosPage } from './shift-pos';

@NgModule({
  declarations: [
    ShiftPosPage,
  ],
  imports: [
    IonicPageModule.forChild(ShiftPosPage),
  ],
})
export class ShiftPosPageModule {}
