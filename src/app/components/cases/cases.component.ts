import { CommonModule } from '@angular/common';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CasesService } from '../../services/cases/cases.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { DoctorsService } from '../../services/doctors/doctors.service';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule, NzEmptyModule],
  templateUrl: './cases.component.html',
  styleUrl: './cases.component.css',
})
export class CasesComponent implements OnInit {
  constructor(
    private _CasesService: CasesService,
    private _DoctorsService: DoctorsService,
    private _Router: Router,
    private _active: ActivatedRoute,
    private msg: NzMessageService
  ) {}
  status: string | null = this._active.snapshot.queryParamMap.get('status');
  doctorId: string | null = this._active.snapshot.queryParamMap.get('id');
  visitId: any;
  isLoading: boolean = false;
  visitsData: any[] = [];
  doctorData: any[] = [];
  doctorName!: string;
  name: string = localStorage.getItem('_name')!;
  // pageSize: number = 7;
  // pageNumber: number = 1;
  // totalElements: number = 0;
  isDoctor =
    localStorage.getItem('_name') === 'د. غادة عبدالرؤوف' ? true : false;

  ngOnInit(): void {
    if (this.doctorId) {
      this.getPatientRedirect();
    }
    this.getDoctors();
    this.getVisitsByStatus();
  }

  getVisitsByStatus() {
    if (this.status) {
      this._CasesService
        .allByDateAndStatus(this.todayDate, this.status)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.visitsData = res;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  // getVisit() {
  //   this._CasesService.allByDateAndStatus(this.todayDate).subscribe({
  //     next: (res) => {
  //       this.visitsData = res.content;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  upDateVisite(id: any, value: boolean) {
    this.visitId = id;
    if (!value) {
      this.isLoading = true;
      this._CasesService.updateVisit(id, true).subscribe({
        next: (res) => {
          console.log(res);

          this.getVisitsByStatus();
          this.getPatientRedirect();
          this.isLoading = false;
          this.visitId = '';

          return res;
        },
      });
    }
  }

  redirectVisit(visitId: any, event: any) {
    let doctorId = event.target.value;
    console.log(doctorId);
    this._CasesService.rediretToDoctor(visitId, doctorId).subscribe({
      next: (res) => {
        this.doctorName = res.doctorRedirectedTo.fullName;
        console.log(this.doctorName);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getDoctors() {
    this._DoctorsService.getAllDoctor().subscribe({
      next: (res) => {
        console.log(res);
        this.doctorData = res;
      },
    });
  }

  getPatientRedirect() {
    if (this.doctorId) {
      this._DoctorsService.allDoctorRedirections(this.doctorId).subscribe({
        next: (res) => {
          console.log(res);
          this.visitsData = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  // pageChanged(event: number): void {
  //   this._CasesService.getVisitsPage(event).subscribe({
  //     next: (res) => {
  //       this.visitsData = res.content;
  //       this.pageSize = 7;
  //       this.pageNumber = 1;
  //       this.totalElements = res.totalElements;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  goInfo(id: string | null, status: string | null) {
    this._Router.navigate(['/patient-info'], {
      queryParams: { id: id, status: status },
    });
  }

  CHECKUP() {
    this._Router.navigate(['/personal-info']);
  }

  FOLLOWUP() {
    this._Router.navigate(['/patient']);
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
