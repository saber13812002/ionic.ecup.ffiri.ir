import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { ENV } from '../../env';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage({
  name: 'AboutPage'
})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [RestProvider]
})
export class AboutPage {

  status: string;
  token;
  id;
  cardNumber;
  refId;
  trackingCode;
  transId;



  messageStatus: boolean;

  constructor(
    private iab: InAppBrowser,
    public navCtrl: NavController,
    public restProvider: RestProvider,
    public toastController: ToastController
  ) {

  }

  async ionViewDidLoad() {

    let wptoken = await localStorage.getItem('wpIdeaTokenECUP');
    this.id = (wptoken ? JSON.parse(wptoken).usr.id : null);
    this.token = (wptoken ? JSON.parse(wptoken).token : null);


    this.presentToast("کمی صبر کنید");

    await this.getMePay();


  }

  async getMePay() {
    this.restProvider.postTokenGetPayStatus(this.id, this.token).subscribe(data => {
      console.log(data);
      if (data.data[0]) {
        this.status = data.data[0].result;
        this.cardNumber = data.data[0].cardNumber;
        this.refId = data.data[0].refId;
        this.trackingCode = data.data[0].trackingCode;
        this.transId = data.data[0].transId;
        this.presentToast("بارگذاری شد");
      }
      return data;
    });
  }

  async signup(type: string) {
    let signupOrSignin = (type == 'signup' ? ENV.security.register : ENV.security.login);

    let oauthUrl = ENV.api.baseUrl + ENV.service.payment +
      '?author_id=' + this.id
      //+ '&' +
      // 'redirect_uri=' + ENV.redirectUri + '&' +
      // 'response_type=id_token%20token&'
      ;

    if (type == 'add')
      oauthUrl = 'https://ffiri.ir/blog/wp-admin/post-new.php';
    else if (type == 'all')
      oauthUrl = 'https://ffiri.ir/blog/wp-admin/edit.php';

    const browser = this.iab.create(oauthUrl, '_blank', 'location=no,clearcache=yes,clearsessioncache=yes,useWideViewPort=yes');

    browser.on('loadstart').subscribe((event) => {
      if ((event.url).indexOf('http://localhost:8100') === 0) {
        browser.on('exit').subscribe(() => { });
        browser.close();
        const defaultError = 'Problem authenticating with SimplePOS IDS';
      }
    });
    browser.on('exit').subscribe(function (event) {
    });

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
