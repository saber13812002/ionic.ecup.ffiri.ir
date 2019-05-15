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

  postTokenValidate(id, email, name: string, family: string, mobile: string, national_code: string, psn_id: string) {
    let uri = ENV.api.baseUrl + ENV.service.getMe;
    console.log(uri);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    let data = "id=" + id
      + "&password=$2y$10$L5T8g1Zv26zOGyK0bVN7yuc56o.VOLb4lnnP.e4QgFczd2AF.wetK";
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
