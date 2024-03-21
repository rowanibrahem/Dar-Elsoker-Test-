import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private _HttpClient: HttpClient) {}
  baseUrl: string = 'https://api-dar-elsokar.ebdaa-business.com/api/v1/';

  getPatientPage(pageNum: number = 1): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}patients?page=${pageNum}`);
  }

  getPatientById(id: string | null): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}patients/${id}`);
  }

  updatePatient(patientData: {}): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}patients`, patientData);
  }

  savePatient(patientData: {}): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}patients`, patientData);
  }

  // getPatientMedicalRecords(id: string | null): Observable<any> {
  //   return this._HttpClient.get(
  //     `${this.baseUrl}/patients/${id}/medical-records`
  //   );
  // }

  deletePatient(id: number): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}patients/${id}`);
  }
}
