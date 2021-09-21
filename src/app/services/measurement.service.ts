import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private APIURL = `${environment.APIURL}/measurements`;

  constructor(private http: HttpClient) { }

  getMeasurements(): Promise<any> {
    return this.http.get(this.APIURL).toPromise();
  }

  createMeasurement(body: any): Promise<any> {
    return this.http.post(this.APIURL, body).toPromise();
  }
}
