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

  public stories = new Array();
  public posts = new Array();

  public token = "";

  public id: string;
  public name: string;
  public family: string;
  public mobile: string;
  public email: string;
  public national_code: string;
  public psn_id: string;

  data: any;
  data2: Info = { id: '', family: '', name: '', mobile: '' };
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
    let wptoken = await localStorage.getItem('wpIdeaToken');
    this.id = (wptoken ? JSON.parse(wptoken).usr.id : null);
    this.token = (wptoken ? JSON.parse(wptoken).token : null);

    if (this.token)
      this.presentToast("شما لاگین هستید میتوانید ادامه دهید");
    else
      this.presentToast("پین اشتباه است");

    await this.getMe();


  }

  async getMe() {
    this.restProvider.postTokenValidate(this.id, this.email, null, null, null, null, null).subscribe(data => {
      console.log(data);
      if (data.data[0]) {
        this.name = data.data[0].name;
        this.family = data.data[0].family;
        this.mobile = data.data[0].mobile;
        this.email = data.data[0].email;
        this.national_code = data.data[0].national_code;
        this.psn_id = data.data[0].psn_id;
      }
      return data;
    });
  }

  public modified() {
    this.change = true;
  }

  save() {

    this.restProvider.postTokenValidate(this.id, this.email, this.name, this.family, this.mobile, this.national_code, this.psn_id).subscribe(data => {
      console.log(data);
      if (data.data[0]) {
        this.name = data.data[0].name;
        this.family = data.data[0].family;
        this.mobile = data.data[0].mobile;
        this.email = data.data[0].email;
        this.national_code = data.data[0].national_code;
        this.psn_id = data.data[0].psn_id;
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
}
