import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FuelEntryPage } from './fuel-entry';

@NgModule({
  declarations: [
    FuelEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(FuelEntryPage),
  ],
})
export class FuelEntryPageModule {}
