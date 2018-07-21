import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { ToastController, LoadingController } from 'ionic-angular';
import { map } from 'rxjs/operators';
/**
 * Generated class for the CashPosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cash-pos',
  templateUrl: 'cash-pos.html',
})
export class CashPosPage {
  public getData = [];
  total = 0.0;
  rTotal: string;
  alartarry =[];
  loading;

  constructor( public navParams: NavParams, public service: ServicesProvider, private toastCtrl: ToastController,public loadingCtrl: LoadingController) {
    this.getdata('S');   
  }
  
 
  updateCss(){
    setTimeout(()=>{
      var div = document.querySelector('#itemListId');
      for(let i=0;i<this.alartarry.length; i++)
      {    
        if(this.alartarry[i]==1)
        {
          let j=i+1;
          div.querySelectorAll('.item:nth-child(' + j + 'n+0)')[0].classList.add('alart');       
        }
        else
        {
          let j=i+1;
          div.querySelectorAll('.item:nth-child(' + j + 'n+0)')[0].classList.add('alart-padding');   
        }    
      }
    },500);
   
  }

  ionViewDidLeave(){
    this.loading.dismissAll();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Server Error',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  refresh() {
    this.getdata("r");
  }

  getdata(sType) {
  

    this.getData = [];
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
     this.loading.present();
    this.service.getCash(sType).pipe(map(res => res))
    .subscribe(data => {
      var SubString = data.match(/\[(.*?)\]/);
      this.getData.push(SubString[0])
      this.getData = JSON.parse(this.getData[0]);
      this.rTotal = this.getData[this.getData.length - 1]["CashBal"];
      this.getData.splice(-1, 1);
      this.alartarry=[];
      this.getData.forEach(eachObj => {
        this.alartarry.push(eachObj["UpStat"]);
      });
      this.updateCss();
      this.loading.dismissAll();
    },
      err => {
        this.loading.dismissAll();
        this.presentToast()
      });
  }

}
