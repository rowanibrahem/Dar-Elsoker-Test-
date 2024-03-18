import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = 'https://api-dar-elsokar.ebdaa-business.com/api/v1/';

  getStatisticsByDate(date: string): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}visits/statistics?date=${date}`
    );
  }

  allByDateAndStatus(date: string, value: string): Observable<any> {
    return this._HttpClient.patch(
      `${this.baseUrl}/visits/by-date/${date}?status=${value}`,
      {
        date: date,
      }
    );
  }

  getVisitsPage(pageNum: number = 1): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}visits?page=${pageNum}`);
  }

  saveVisit(visitData: {}): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}visits`, visitData);
  }
}
