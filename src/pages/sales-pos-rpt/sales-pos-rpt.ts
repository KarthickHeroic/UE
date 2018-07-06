import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { ServicesProvider} from './../../providers/services/services';

import { LoginPage } from './../../pages/login/login';
import { SalesPosPage } from '../sales-pos/sales-pos';
/**
 * Generated class for the SalesPosRptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-pos-rpt',
  templateUrl: 'sales-pos-rpt.html',
})
export class SalesPosRptPage {
  fromDate
  getData = [];
  total;
  rTotal;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider, public platform:Platform,
   ) {

    this.fromDate = navParams.get('fromDate');

  
    if (this.fromDate != null){
      this.fromDate =  new Date(this.fromDate)
      this.getdata(this.fromDate.toLocaleDateString("en-US"))      
    }
    else
    {
      this.fromDate = new Date();
      this.getdata(this.fromDate.toLocaleDateString("en-US"))      
    }   
  }
  onLogout(){
    this.service.storageSet();      
    this.navCtrl.push(LoginPage);     
  }
  onSearch(){       
    this.navCtrl.push(SalesPosPage);     
  }
  
  onExit(){
    this.platform.exitApp(); 
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad SalesPosRptPage');
  }

  getdata(fromDate){   
    this.getData = [];

    this.service.getSalesPos(fromDate).map(res => res).subscribe(data => { 
      var SubString = data.match(/\[(.*?)\]/);
      this.getData.push(SubString[0]) 
      this.getData = JSON.parse(this.getData[0]);
      console.log(this.getData);      
  

this.rTotal=0;
      for ( let i = 0; i < this.getData.length; i++) {       
        this.total =  parseFloat(this.getData[i]["NT"]); 
        this.rTotal = this.total+this.rTotal;      }    
    this.rTotal =  this.rTotal.toFixed(2);
if(this.rTotal=='NaN'){
  this.rTotal='0.00'
}
      });
}

}
