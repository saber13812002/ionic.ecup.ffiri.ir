import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Response } from '@angular/http';
import { ENV } from '../../env';

@Injectable()
export class RestProvider {

  constructor(public http: HttpClient,
    public httpp: Http) {
    console.log('Hello RestProvider Provider');
  }

  apiUrl = ENV.api.baseUrl;
  apiFolder = 'api';

  getTv(page, type?): Observable<any[]> {
    let q = (type == "mp4") ? "&type=mp4" : ((type == "qavami") ? "&type=qavami" : "");

    let URL1 = 'https://berimbasket.ir/bball/bots/botTvRadioGet.php?format=json' + q + '&page=' + page + '&$number_of_posts=10';

    return this.http.get(URL1)
      .catch((err) => {
        return Observable.throw(err)
      })
  }


  getRequireOtp(phone){
    
  }

  postLogin(username, password) {
    let uri = ENV.security.serverUrl + ENV.security.jwtToken;

    let data = {
      username: username,
      password: password
    };

    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post(uri, data, { headers: headers })
      //.catch(this.handleError);
      .catch((err) => {

        // Do messaging and error handling here

        return Observable.throw(err)
      })
  }

  postTokenValidate(token) {
    let uri = ENV.security.serverUrl + ENV.security.jwtToken + ENV.security.validate;

    let header: Headers = new Headers();
    header.append('Authorization', 'Bearer ' + token);
    return this.httpp.post(uri, {}, { headers: header })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      if (error.status == 403)
        localStorage.setItem('wpIonicToken', null);
    }
    return Observable.throw(errMsg);
  }

}
