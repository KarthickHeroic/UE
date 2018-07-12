

import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ShiftPosPage } from './../pages/shift-pos/shift-pos';
import { SaleItemPage } from './../pages/sale-item/sale-item';
// import { FuelEntryPage } from './../pages/fuel-entry/fuel-entry';
import { CashPosPage } from './../pages/cash-pos/cash-pos';
import { Storage } from '@ionic/storage';
import { SalePosPage } from '../pages/sale-pos/sale-pos';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public storage: Storage, public splashScreen: SplashScreen) {
    this.initializeApp();

    storage.get('Status').then((val) => {
      if (val == 'login') {
        this.rootPage = HomePage;
      }
      else {
        this.rootPage = LoginPage;
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Cash Position', component: CashPosPage },
      { title: 'Sales Items', component: SaleItemPage },
      { title: 'Shift Production', component: ShiftPosPage },
      { title: 'Sales Position', component: SalePosPage }
      // { title: 'Fuel Entry', component: FuelEntryPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  exit(){
this.platform.exitApp();
  }
  logout(){
    this.nav.setRoot(LoginPage);  
  }
}
