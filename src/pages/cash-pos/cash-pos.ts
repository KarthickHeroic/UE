import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { LoginPage } from './../../pages/login/login';
/**
 * Generated class for the RptCashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rpt-cash',
  templateUrl: 'cash-pos.html',
})
export class CashPosPage {
  public getData=[];
  total = 0.0;
  rTotal:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServicesProvider, public platform:Platform) {
    this.getdata('s');
  }

  ionViewDidLoad() {
   
  }

  refresh(){ 
    this.getdata("r");
  }
  onLogout(){    
    this.service.storageSet();      
    this.navCtrl.push(LoginPage);     
  }
  onExit(){
    this.platform.exitApp(); 
  }
  getdata(sType){   
    this.getData = [];
    this.service.getCash(sType).map(res => res).subscribe(data => { 
      var SubString = data.match(/\[(.*?)\]/);
      this.getData.push(SubString[0])
      this.getData = JSON.parse(this.getData[0]);
      this.rTotal = this.getData[this.getData.length-1]["CashBal"];       
      this.getData.splice(-1,1); 
      });



  }

}
