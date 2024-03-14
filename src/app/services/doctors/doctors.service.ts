import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = `https://api-dar-elsokar.ebdaa-business.com/api/v1/`;

  getAllDoctor(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}doctors/all`);
  }

  saveDoctor(doctorData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}doctors`, doctorData);
  }

  updateDoctor(doctorId: any, value: boolean): Observable<any> {
    return this._HttpClient.patch(
      `${this.baseUrl}doctors/${doctorId}/availability?availability=${value}`,
      {
        id: doctorId,
        availability: value,
      }
    );
  }
}
