import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private _HttpClient: HttpClient) {}
  getPatient(): Observable<any> {
    return this._HttpClient.get(`http://localhost:3000/patient`);
  }
}
