import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { App, ViewController } from 'ionic-angular';
import { DashboardPage } from './../dashboard/dashboard';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
alertTitle;
  alertSubtitle;

  public rootPage: any = LoginPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public viewCtrl: ViewController, public storage: Storage,public platform:Platform,
      public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: this.alertTitle,
      subTitle: this.alertSubtitle,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  
  pushPage() {
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.push(DashboardPage);
    this.storage.set('Status', 'login');    
  }


  Submit(inputs){
    if (inputs.value.username == "admin")
    {
      if (inputs.value.password=="admin")
      {
        this.pushPage()
      }
      else
      {
        this.alertTitle="Passowrd"
        this.alertSubtitle ="Password is invalid!"
        this.presentAlert();
      }
    }
    else
    {
      this.alertTitle = "User Name"
      this.alertSubtitle = "User Name is invalid!"
      this.presentAlert();
    }
    
   

  }
}
