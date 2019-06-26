import { Info } from './../../models/info';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { ENV } from '../../env';

@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [RestProvider]
})
export class HomePage {

  patternNationalCode: RegExp = /^\d{10}$/;

  public stories = new Array();
  public posts = new Array();

  public token = "";

  public id: string;
  public id2: string;
  public name: string;
  public family: string;
  public mobile: string;
  public email: string;
  public national_code: string;
  public psn_id: string;
  public type: string;

  data: any;
  data2: Info = { id: '', family: '', name: '', mobile: '' };

  flagPSN: boolean = true;
  flagNID: boolean = true;
  change: boolean = false;

  errorMessage: string;
  page = 0;
  perPage = 10;
  totalData = 100;
  totalPage = 1;

  public like_btn = {
    color: 'black',
    icon_name: 'heart-outline'
  };

  constructor(
    public navCtrl: NavController,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
  ) {

    let loader = loadingCtrl.create({ content: "در حال بارگذاری ..." });
    loader.present();


    loader.dismiss();
  }

  ngOnInit(): void { }

  async ionViewDidLoad() {
    let wptoken = await localStorage.getItem('wpIdeaTokenECUP');
    // this.id = (wptoken ? JSON.parse(wptoken).usr.id : null);
    // this.id2 = (wptoken ? JSON.parse(wptoken).usr.id.id : null);
    // if (this.id2)
    //   this.id = this.id2;
    this.token = (wptoken ? JSON.parse(wptoken).token : null);

    if (this.token)
      this.presentToast("شما لاگین هستید میتوانید ادامه دهید");
    else
      this.presentToast("پین اشتباه است");


    this.presentToast("کمی صبر کنید");

    await this.getMe();


  }

  async getMe() {
    this.restProvider.postTokenValidate(this.token, this.email, null, null, null, null, null, null).subscribe(data => {
      console.log(data);
      if (data.data[0]) {
        this.name = data.data[0].name;
        this.family = data.data[0].family;
        this.mobile = data.data[0].mobile;
        this.email = data.data[0].email;
        this.national_code = data.data[0].national_code;
        this.psn_id = data.data[0].psn_id;
        this.type = data.data[0].type;
        this.presentToast("بارگذاری شد");
      }
      return data;
    });
  }

  public modified() {
    this.change = true;
  }

  async checkNID() {
    this.modified();

    if (this.patternNationalCode.test(this.national_code) && this.checkCodeMeli(this.national_code)) {
      this.flagNID = true;
    }
    else {
      this.flagNID = false;
    }
  }

  async checkPSN() {
    this.modified();

    if ((this.psn_id)) {
      this.flagPSN = true;
    }
    else {
      this.flagPSN = false;
    }
  }

  save() {
    this.presentToast("کمی صبر کنید");
    this.restProvider.postTokenValidate(this.token, this.email, this.name, this.family, this.mobile, this.national_code, this.psn_id, this.type).subscribe(data => {
      console.log(data);
      if (data.data[0]) {
        this.name = data.data[0].name;
        this.family = data.data[0].family;
        this.mobile = data.data[0].mobile;
        this.email = data.data[0].email;
        this.national_code = data.data[0].national_code;
        this.psn_id = data.data[0].psn_id;
        this.type = data.data[0].type;
        this.presentToast("ذخیره شد");
      }
      return data;
    });
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;

  }

  likeButton() {
    if (this.like_btn.icon_name === 'heart-outline') {
      this.like_btn.icon_name = 'heart';
      this.like_btn.color = 'danger';
      // Do some API job in here for real!
    }
    else {
      this.like_btn.icon_name = 'heart-outline';
      this.like_btn.color = 'black';
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

  checkCodeMeli(input) {
    if (!/^\d{10}$/.test(input)
      || input == '0000000000'
      || input == '1111111111'
      || input == '2222222222'
      || input == '3333333333'
      || input == '4444444444'
      || input == '5555555555'
      || input == '6666666666'
      || input == '7777777777'
      || input == '8888888888'
      || input == '9999999999')
      return false;
    var check = parseInt(input[9]);
    var sum = 0;
    var i;
    for (i = 0; i < 9; ++i) {
      sum += parseInt(input[i]) * (10 - i);
    }
    sum %= 11;
    return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
  }

}
