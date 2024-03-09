import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = 'https://api-dar-elsokar.ebdaa-business.com/api/v1/';

  getStatisticsByDate(date: Date): Observable<any> {
    return this._HttpClient.get(this.baseUrl + date);
  }

  
}
