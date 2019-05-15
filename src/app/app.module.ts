import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FifaApp } from './app.component';
import { Platform } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ElementRef } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageServiceProvider } from '../providers/language-service/language-service';
import { LoginPage } from '../pages/login/login';

import { Login2Page } from '../pages/login2/login2';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { PostsProvider } from '../providers/wp-rest/posts'

@NgModule({
  declarations: [
    FifaApp,
    AboutPage,
    LoginPage,
    Login2Page,
    ContactPage,
    HomePage,
    TabsPage,
    //HttpClientModule,
    //JsonpModule // if used
  ],
  imports: [
    HttpModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(FifaApp, {}, {
      links: [

      ]
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    FifaApp,
    AboutPage,
    LoginPage,
    Login2Page,
    ContactPage,
    HomePage,
    TabsPage,
    //HttpClientModule,
    //JsonpModule // if used
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LanguageServiceProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    PostsProvider,
    InAppBrowser,
    LanguageServiceProvider
  ]
})

export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
