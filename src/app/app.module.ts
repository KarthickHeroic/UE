

// Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


// Ionic Imports
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

// Component Imports
import { MyApp } from './app.component';

// Third Party Imports
import { DatePickerModule } from 'ion-datepicker';

// Pages Imports
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { ShiftPosRptPage } from './../pages/shift-pos-rpt/shift-pos-rpt';
import { ShiftPosPage } from './../pages/shift-pos/shift-pos';
import { SalePosRptPage } from './../pages/sale-pos-rpt/sale-pos-rpt';
import { SalePosPage } from './../pages/sale-pos/sale-pos';
import { SaleItemRptPage } from './../pages/sale-item-rpt/sale-item-rpt';
import { SaleItemPage } from './../pages/sale-item/sale-item';
import { FuelEntryPage } from './../pages/fuel-entry/fuel-entry';
import { CashPosPage } from './../pages/cash-pos/cash-pos';




// Material Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { ServicesProvider } from '../providers/services/services';
import { SalePosRptFilterPage } from '../pages/sale-pos-rpt-filter/sale-pos-rpt-filter';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShiftPosRptPage,
    LoginPage,
    ShiftPosPage,
    SalePosRptPage,
    SaleItemRptPage,
    SaleItemPage,
    FuelEntryPage,
    CashPosPage,
    SalePosPage,
    SalePosRptFilterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatGridListModule,
    HttpClientModule,
    MatDividerModule,
    MatAutocompleteModule,
    DatePickerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,  
    LoginPage,
    ShiftPosRptPage,
    ShiftPosPage,
    SalePosRptPage,
    SaleItemRptPage,
    SaleItemPage,
    FuelEntryPage,
    CashPosPage,
    SalePosPage,
    SalePosRptFilterPage
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider
  ]
})
export class AppModule {}
