import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { RptGetSalesRptPage } from '../pages/rpt-get-sales-rpt/rpt-get-sales-rpt';
import { CashPosPage } from '../pages/cash-pos/cash-pos';
import { RptItemSalesPage } from '../pages/rpt-item-sales/rpt-item-sales';
import { RptShiftPage } from '../pages/rpt-shift/rpt-shift';
import { RptGetShiftRptPage } from './../pages/rpt-get-shift-rpt/rpt-get-shift-rpt';
import { SalesPosPage } from './../pages/sales-pos/sales-pos';
import { SalesPosRptPage } from './../pages/sales-pos-rpt/sales-pos-rpt';
import { FuelEntryPage } from './../pages/fuel-entry/fuel-entry';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { IonicStorageModule } from '@ionic/storage';
import { ServicesProvider } from '../providers/services/services';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    DashboardPage,
    CashPosPage,
    RptItemSalesPage,
    RptShiftPage,
    RptGetSalesRptPage,
    RptGetShiftRptPage,
    SalesPosPage,
    SalesPosRptPage,
    FuelEntryPage
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
    MatAutocompleteModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DashboardPage,
    CashPosPage,
    RptItemSalesPage,
    RptShiftPage,
    RptGetSalesRptPage,
    RptGetShiftRptPage,
    SalesPosPage,
    SalesPosRptPage,
    FuelEntryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServicesProvider
  ]
})
export class AppModule {}
