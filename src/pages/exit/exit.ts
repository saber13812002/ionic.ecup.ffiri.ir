import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { HomePage } from './../home/home';

@IonicPage({
  name: 'ExitPage'
})
@Component({
  selector: 'page-exit',
  templateUrl: 'exit.html'
})

export class ExitPage {
  messageStatus: boolean;

  constructor(
    private iab: InAppBrowser,
    public navCtrl: NavController,
    public toastController: ToastController
  ) {

  }

  async ionViewDidLoad() {
    this.presentToast("کمی صبر کنید");
  }

  async exit(type?: string) {
    console.log('setting buttion');
    if (type == 'profile') {
      this.navCtrl.push(HomePage)
    }
    else if (type == 'payment') {
      this.navCtrl.push(AboutPage)
    }
    else {
      localStorage.removeItem('wpIdeaTokenECUP');
      this.navCtrl.push(LoginPage)
    }

  }

  presentToast(msg: string, time = 2000) {
    const toast = this.toastController.create({
      message: msg,
      duration: time,
      position: "top"
    });
    toast.present();
  }
}
