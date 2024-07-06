import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from '../../pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { DoctorsService } from '../../services/doctors/doctors.service';
import { CasesService } from '../../services/cases/cases.service';
import { initFlowbite } from 'flowbite';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SearchPipe,
    FormsModule,
    NgxPaginationModule,
    NzDatePickerModule,
    NzEmptyModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(
    private _DoctorsService: DoctorsService,
    private _CasesService: CasesService,
    private _OAuthService: OAuthService,
    private _Router: Router // private _Renderer2: Renderer2
  ) {}
  dashTable: any = [];
  statisticsData: any = {};
  searchvalue: string = '';
  isLoading: boolean = false;
  doctorId: any;
  name: string = localStorage.getItem('_name')!;
  ngOnInit(): void {
    this.getDoctorData();
    this.getStatisticsData();
    this.setLocalStorage();
    console.log(this._OAuthService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getStatisticsData;
  }

  setLocalStorage() {
    const token: string | null = this._OAuthService.getAccessToken() || '';
    const name: string | null =
      this._OAuthService.getIdentityClaims()['name'] || '';
    localStorage.setItem('_token', token as string);
    localStorage.setItem('_name', name as string);
  }

  getStatisticsData() {
    this._CasesService.getStatisticsByDate(this.todayDate).subscribe({
      next: (res) => {
        console.log(res);
        this.statisticsData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getDoctorData() {
    this._DoctorsService.getAllDoctor().subscribe({
      next: (res) => {
        console.log(res);
        this.dashTable = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateDocter(id: any, value: boolean) {
    this.doctorId = id;
    let value2 = value ? false : true;
    this.isLoading = true;
    this._DoctorsService.updateDoctor(id, value2).subscribe({
      next: (res) => {
        this.getDoctorData();
        this.isLoading = false;
        this.doctorId = '';
      },
    });
  }

  govisits(id: string) {
    this._Router.navigate(['/cases'], {
      queryParams: { status: id },
    });
  }

  getTodayDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    // Format the date as "yyyy-MM-dd"
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  // Example usage:
  todayDate = this.getTodayDate();
}
