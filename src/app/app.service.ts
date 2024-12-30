import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable()
export class AppService {
  public updateProfileOptions: Array<any> = [];
  public updateEnterpriseStatus: boolean = false;
  server1 = 'http://18.216.166.30';
  server2 = '';
  server3 = '';
  prodserver = 'https://www.tutalec.com';
  serverused: any;
  ticketid: any;
  feedbackBadgeCount = 0;
  broadcastBadgeCount = 0;
  curbsideBadgeCount = 0;
  textPOSBadgeCount = 0;
  isCurbSide = true;
  isFeedback = true;
  isBroadcast = true;
  isBroadcastLockedMessage = '';
  isFeedbackLockedMessage = '';
  isCurbsideLockedMessage = '';
  private headers = new HttpHeaders({
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*',
  });
  constructor(private http: HttpClient) {
    this.serverused = this.prodserver;
  }
  getInitalDetails(restId: any) {
    console.log('getInital details');
    let Url = this.serverused + '/initialLoad';
    let data = {
      restId: '+1' + restId,
    };
    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }

  getAllOrders(restid: any, date: any) {
    console.log('Get all Orders');
    let Url = this.serverused + '/getAllOrders';
    let headerInfo = new Headers({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
    });
    let data = {
      restId: '+1' + restid,
      orderDate: date, //"2019-05-10"//date
    };
    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }
  getrestInfo(restid: any) {
    let Url = this.serverused + '/getStoreInfo';
    let headerInfo = new Headers({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
    });
    let data = {
      restId: '+1' + restid,
    };
    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }
  getOneDayRecord(storeId: any, storeDate: any) {
    let Url = this.serverused + '/getOneDayRecord';
    let headerInfo = new Headers({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
    });
    let data = {
      restId: storeId,
      storeDate: storeDate,
    };
    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }
  tabletDoneUndoneTogle(curbId: any, status: any, restId: any) {
    let Url = this.serverused + '/delToCarAction';
    let headerInfo = new Headers({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
    });
    let data = {
      curbId: curbId,
      status: status,
      restId: restId,
    };
    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }
  updateTicketId(curbId: any, ticketId: any) {
    let Url = this.serverused + '/updateTicketId';
    let headerInfo = new Headers({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
    });
    let data = {
      curbId: curbId,
      ticketId: ticketId,
    };
    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }
  getresponseInfo(curbId: any) {
    let Url = this.serverused + '/getResponseInfo';
    let headerInfo = new Headers({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
    });
    let data = {
      curbId: curbId,
    };
    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }
  updateresponseInfo(curbId: any, time: any, restId: any, custId: any) {
    let Url = this.serverused + '/updateResponseInfo';
    let headerInfo = new Headers({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
    });
    let data = {
      custId: custId,
      restId: restId,
      text: time,
      curbId: curbId,
    };
    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }
  pauseOrders(restid: any) {
    console.log('Pause Orders');
    let Url = this.serverused + '/pauseOrders';
    let headerInfo = new Headers({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
    });
    let data = {
      restId: '+1' + restid,
    };
    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }
  acceptOrders(orderid: any, eta: any, customFlag: any) {
    console.log('Accept Orders');

    let Url = this.serverused + '/acceptOrders';
    let headerInfo = new Headers({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
    });
    let data = {
      orderId: orderid,
      eta: eta,
      customFlag: customFlag,
    };
    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }

  refundOrders(
    orderId: any,
    reason: any,
    dollarValue: any,
    timestamp: any,
    refundType: any,
  ) {
    console.log('refund order');
    let Url = this.serverused + '/refundOrders';
    let headerInfo = new Headers({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
    });
    let data = {
      orderId: orderId,
      reason: reason,
      dollarValue: dollarValue,
      timestamp: timestamp,
      refundType: refundType,
    };
    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }
  checkPin(restId: any, storePin: any) {
    console.log('CheckPin');
    storePin = storePin.toString();
    let Url = this.serverused + '/checkStorePin';
    let headerInfo = new Headers({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
    });
    let data = {
      restId: restId,
      storePin: storePin,
    };

    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }
  resetPin(restId: any) {
    console.log('ResetPin');
    let Url = this.serverused + '/resetStorePin';
    let headerInfo = new Headers({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
    });
    let data = {
      restId: restId,
    };
    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }

  storeReport(restId: any, storeDate: any) {
    console.log('storeReport');

    let Url = this.serverused + '/getDailyStoreData';
    let headerInfo = new Headers({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
    });
    let data = {
      restId: restId,
      orderDate: storeDate,
    };

    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }

  resetETA(restId: any, extendFlag: any, pickupETA: any, deliveryETA: any) {
    console.log('storeReport');

    let Url = this.serverused + '/resetEta';
    let headerInfo = new Headers({
      Accept: '*',
      'Access-Control-Allow-Origin': '*',
    });
    let data = {
      restId: restId,
      extendEta: extendFlag,
      pickupSetEta: pickupETA,
      deliverySetEta: deliveryETA,
    };

    return this.http.post(Url, data, { headers: this.headers }).pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }

  getStaticData() {
    return this.http.get('/assets/data.json').pipe(
      map((res: any) => res),
      catchError(this.handleError),
    );
  }
  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Response status: ' + res.status);
    }
    let body = res.json();
    console.log(body);
    return body;
  }
  //
  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
