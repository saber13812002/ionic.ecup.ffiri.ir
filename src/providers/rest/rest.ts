import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Response } from '@angular/http';
import { ENV } from '../../env';
import { Info } from './../../models/info';


@Injectable()
export class RestProvider {

  constructor(public http: HttpClient,
    public httpp: Http) {
    console.log('Hello RestProvider Provider');
  }

  postOtp1(mobile): Observable<any[]> {

    let uri = ENV.api.baseUrl + ENV.otp_api.otp1_url;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
      })
    };
    let data = "mobile=" + mobile; //updated

    return this.http.post(uri, data, httpOptions)
      .catch((err) => {
        return Observable.throw(err)
      });
  }


  postOtp2(mobile, pin): Observable<any[]> {

    let uri = ENV.api.baseUrl + ENV.otp_api.otp2_url;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
      })

    };
    let data = "mobile=" + mobile + "&code=" + pin; //updated

    return this.http.post(uri, data, httpOptions)
      .catch((err) => {
        return Observable.throw(err)
      });
  }

  async getOtp1(mobile) {

    let url =
      ENV.api.baseUrl +
      ENV.otp_api.otp11_url +
      `?mobile=${mobile}`;

    console.log(url);

    return this.http
      .get(
        url,
        {
          headers:
            new HttpHeaders(
              {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'MyClientCert': '',        // This is empty
                'MyToken': ''              // This is empty
              }
            )
        }
      )
      .map(res => res as any[]);
  }

  getRequireOtp(phone) {

  }

  postLogin(mobile, pin) {

    let uri = ENV.api.baseUrl + ENV.otp_api.otp2_url;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    let data = "phone=" + mobile + "&code=" + pin;

    return this.http.post(uri, data, httpOptions)
      .catch((err) => {
        return Observable.throw(err)
      });
  }

  async getOtp2(mobile, pin) {
    let url = ENV.api.baseUrl + ENV.otp_api.otp22_url +
      `${mobile}/${pin}`;

    console.log(url);

    return this.http
      .get(
        url,
        {
          headers:
            new HttpHeaders(
              {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'MyClientCert': '',        // This is empty
                'MyToken': ''              // This is empty
              }
            )
        }
      )
      .map(res => res as any[]);
  }

  postTokenValidate(id, email, name: string, family: string, mobile: string, national_code: string, psn_id: string, type: string) {
    let uri = ENV.api.baseUrl + ENV.service.getMe;
    console.log(uri);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    let data = "token=" + id;
    if (email)
      data += ("&email=" + email);
    if (name)
      data += ("&name=" + name);
    if (family)
      data += ("&family=" + family);
    if (mobile)
      data += ("&mobile=" + mobile);
    if (national_code)
      data += ("&national_code=" + national_code);
    if (psn_id)
      data += ("&psn_id=" + psn_id);
    if (type)
      data += ("&type=" + type);

    return this.http.post(uri, data, httpOptions)
      .catch((err) => {
        return Observable.throw(err)
      });
  }

  postTokenGetPayStatus(author_id: string, token: string) {
    let uri = ENV.api.baseUrl + ENV.service.getMePay;
    console.log(uri);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    let data = "author_id=" + author_id;
    if (token)
      data += ("&token=" + token);


    return this.http.post(uri, data, httpOptions)
      .catch((err) => {
        return Observable.throw(err)
      });
  }

}
