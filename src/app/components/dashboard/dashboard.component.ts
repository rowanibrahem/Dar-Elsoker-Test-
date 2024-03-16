import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from '../../search.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { DoctorsService } from '../../services/doctors/doctors.service';
import { CasesService } from '../../services/cases/cases.service';
import { initFlowbite } from 'flowbite';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

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

  ngOnInit(): void {
    this.getDoctorData();
    this.getStatisticsData();
    initFlowbite();
    if (localStorage.getItem('_token') == null) {
      const _token = this._OAuthService.getAccessToken();
      localStorage.setItem('_token', _token);
    }
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
      queryParams: { value: id },
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
