import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { ENV } from '../../env';

@IonicPage({
  name: 'contact'
})
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [RestProvider]
})

export class ContactPage {

  public people = new Array();
  public serverWebApp;

  private detailPage;
  data: any;

  errorMessage: string;
  page = 0;
  perPage = 10;
  totalData = 100;
  totalPage = 1;


  constructor(
    public navCtrl: NavController,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController
  ) {

    this.serverWebApp = ENV.webapp.baseUrl;
    let loader = loadingCtrl.create({ content: "..." });
    loader.present();

  }

  loadPlayerDetail(person) {
    console.log(person);
    this.navCtrl.push(this.detailPage, { person: person });
  }

  doInfinite(infiniteScroll) {
    this.page = this.page + 1;

  }
}
