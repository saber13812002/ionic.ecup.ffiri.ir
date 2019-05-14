import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';
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

  options: GeolocationOptions;
  currentPos: Geoposition;

  data: any;

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
    private geolocation: Geolocation
  ) {

    let loader = loadingCtrl.create({ content: "در حال بارگذاری ..." });
    loader.present();


    loader.dismiss();
  }

  ngOnInit(): void {}

  async ionViewDidLoad() {
    let wptoken= await localStorage.getItem('wpIonicToken');

    this.token = (wptoken?JSON.parse(wptoken).token:null);

    if (this.token )
      this.presentToast("شما لاگین هستید میتوانید کامنت بگذارید");
    else
      this.presentToast("پین اشتباه است");

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
