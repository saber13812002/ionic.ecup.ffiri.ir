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

  apiUrl = ENV.api.baseUrl;
  apiFolder = 'api';

  postOtp1(mobile): Observable<any[]> {

    let uri = ENV.api.baseUrl + ENV.otp_api.otp1_url;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded' //updated
      })
    };
    let data = "mobile=" + mobile; //updated

    return this.http.post(uri, data, httpOptions)
      .catch((err) => {
        return Observable.throw(err)
      });
  }

  getRequireOtp(phone) {

  }

  postLogin(mobile, pin) {

    let uri = ENV.api.baseUrl + ENV.otp_api.otp2_url;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded' //updated
      })
    };
    let data = "phone=" + mobile + "&code=" + pin; //updated

    return this.http.post(uri, data, httpOptions)
      .catch((err) => {
        return Observable.throw(err)
      });
  }

  postTokenValidate(email, name: string, family: string) {
    let uri = ENV.api.baseUrl + ENV.service.getMe;
    console.log(uri);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    let data = "email=" + email
      + "&password=$2y$10$L5T8g1Zv26zOGyK0bVN7yuc56o.VOLb4lnnP.e4QgFczd2AF.wetK";
    if (name)
      data += ("&name=" + name);
    if (name)
      data += ("&family=" + family);

    return this.http.post(uri, data, httpOptions)
      .catch((err) => {
        return Observable.throw(err)
      });
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      if (error.status == 403)
        localStorage.setItem('wpIdeaToken', null);
    }
    return Observable.throw(errMsg);
  }

}
