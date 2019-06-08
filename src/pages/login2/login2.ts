import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Toast, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceProvider } from "../../providers/language-service/language-service";
import { LanguageModel } from "../../models/language.model";
import { RestProvider } from '../../providers/rest/rest';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { ENV } from '../../env';
import 'rxjs/add/operator/map';
import { URLSearchParams } from '@angular/http';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-login2',
  templateUrl: 'login2.html',
  providers: [RestProvider]
})
export class Login2Page {

  patternMobile: RegExp = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
  patternPin5: RegExp = /^\d{5}$/;

  languageSelected: any;
  languages: Array<LanguageModel>;

  mobile: string;
  pin: string;

  redirectUri: string = "http://localhost:8100/";
  loginUrl = "https://ffiri.ir/blog/jwt.php?client_id=&redirect_uri=&response_type=id_token-token&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbWFzamVkY2xvb2IuaXJcL2Jsb2ciLCJpYXQiOjE1NDk0NjAyMjEsIm5iZiI6MTU0OTQ2MDIyMSwiZXhwIjoxNTUwMDY1MDIxLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.sbGawBdMFt7jAhn3RIYyxui_er0_XsJ67YRWBtaUUyw";

  wpIdeaTokenECUP: any;
  token: any;
  jwt: string;
  JWT: string;
  tokenl: any;

  step1flag: boolean = false;

  logintext = "ورود به عنوان مهمان";

  constructor(public navCtrl: NavController,
    //private cookieService: CookieService,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public languageService: LanguageServiceProvider,
    public toastController: ToastController,
    public restProvider: RestProvider,
    private iab: InAppBrowser,
    public navParams: NavParams) {

    this.languages = this.languageService.getLanguages();
    this.setLanguage();

  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.mobile = this.navParams.get('mobile');

    let params = new URLSearchParams(window.location.search);
    this.JWT = params.get('jwt');
    console.log('jwt :' + this.JWT)

  }

  async getToken() {
    let token = await this.restProvider.postLogin(this.mobile, this.pin).subscribe(data => {
      console.log(data);
      localStorage.setItem('wpIdeaTokenECUP', JSON.stringify(data));
      this.wpIdeaTokenECUP = JSON.stringify(data);
      return data.token;
    });

    //this.wpIdeaTokenECUP = localStorage.getItem('wpIdeaTokenECUP');
  }

  public textChanged() {
    this.step1flag = true;
    this.logintext = "ورود";
  }

  public async login() {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    await this.getToken();

    loading.present();
  }


  async login2() {
    let loader = this.loadingCtrl.create({ content: 'ارسال' });
    await loader.present();

    await this.callOtp22();

    loader.dismiss();
  }

  private async callOtp22() {
    let loading = this.loadingCtrl.create({ content: 'در حال ارسال درخواست به سرور' });
    await loading.present();

    var report = await this.restProvider.getOtp2(
      this.mobile, this.pin
    );

    report.subscribe(
      res => {
        console.log(res);
        localStorage.setItem('wpIdeaTokenECUP', JSON.stringify(res));
        this.wpIdeaTokenECUP = JSON.stringify(res);
        this.step1flag = false;
      },
      err => {
        this.presentToast(
          'سرور در دسترس نیست!'
          // display: 'top',
          // color: 'warning'
        );
        console.log(err);
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }
  public async createAndSaveNonce(): Promise<string> {

    return "";
  }


  async signup(type: string) {
    let signupOrSignin = (type == 'signup' ? ENV.security.register : ENV.security.login);

    let oauthUrl = ENV.security.login + signupOrSignin
    '?client_id=' + ENV.clientId + '&' +
      'redirect_uri=' + ENV.redirectUri + '&' +
      'response_type=id_token%20token&'
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

  signUpIdea() {
    this.navCtrl.setRoot(Login2Page);
  }

  goToFirstPage() {
    this.navCtrl.push(LoginPage)
  }


  gotoInfoPage() {
    this.navCtrl.setRoot(TabsPage);
  }

  async signup2(): Promise<any> {

    return new Promise((resolve, reject) => {

      return this.createAndSaveNonce().then(nonce => {
        let state: string = Math.floor(Math.random() * 1000000000).toString();
        if (window.crypto) {
          const array = new Uint32Array(1);
          window.crypto.getRandomValues(array);
          state = array.join().toString();
        }

        this.buildOAuthUrl(state, nonce).then((oauthUrl) => {

          const browser = this.iab.create(oauthUrl, '_blank', 'location=no,clearcache=yes,clearsessioncache=yes,useWideViewPort=yes');

          browser.on('loadstart').subscribe((event) => {
            if ((event.url).indexOf('http://localhost:8100') === 0) {
              browser.on('exit').subscribe(() => { });
              browser.close();

              var parsedResponse = this.fetchToken(event.url);

              const defaultError = 'Problem authenticating with IDS';
              if (parsedResponse['state'] !== state) {
                reject(defaultError);
              } else if (parsedResponse['access_token'] !== undefined &&
                parsedResponse['access_token'] !== null) {
                resolve(parsedResponse);
              } else {
                reject(defaultError);
              }
            }
          });
          browser.on('exit').subscribe(function (event) {
            reject('The IDS sign in flow was canceled');
          });
        },
          (result) => {
            throw new Error(result);
          }
        );
      });

    }).catch((error) => {
      throw error;
    });
  }

  public fetchToken(url: string): any {
    const parsedResponse = {};
    if (url) {
      var urlParameter = url.split('#')[1];
      if (urlParameter) {
        const responseParameters = urlParameter.split('&');
        for (let i = 0; i < responseParameters.length; i++) {
          parsedResponse[responseParameters[i].split('=')[0]] =
            responseParameters[i].split('=')[1];
        }
      }
    }
    return parsedResponse;
  }

  public async buildOAuthUrl(state, nonce): Promise<string> {

    return this.loginUrl +
      //'?client_id=' + this.oauthService.clientId
      + '&' + 'redirect_uri=' + this.redirectUri
      + '&' + 'response_type=id_token%20token' +
      //+ '&' + 'scope=' + encodeURI(this.oauthService.scope)
      + '&' + 'state=' + state + '&nonce=' + nonce;
  }

  setLanguage() {
    let defaultLanguage = this.translate.getDefaultLang();
    if (this.languageSelected) {
      this.translate.setDefaultLang(this.languageSelected);
      this.translate.use(this.languageSelected);
    } else {
      this.languageSelected = defaultLanguage;
      this.translate.use(defaultLanguage);
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

  step1() {
    if (this.patternMobile.test(this.mobile)) {
      this.step1flag = true;
    }
    else {
      this.step1flag = false;
    }
  }

  sendPin() { }
}
