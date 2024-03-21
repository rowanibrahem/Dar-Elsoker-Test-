import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchPipe } from '../../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient/patient.service';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    CommonModule,
    SearchPipe,
    FormsModule,
    RouterLink,
    NgxPaginationModule,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
})
export class PatientComponent implements OnInit {
  searchvalue: string = '';
  patientData: any[] = [];
  pageSize: number = 0;
  pageNumber: number = 0;
  totalElements: number = 0;

  constructor(
    private _PatientService: PatientService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.getPatient();
  }

  goPatientDetails(id: string, status: string) {
    this._Router.navigate(['/patient-details'], {
      queryParams: { id: id, status: status },
    });
  }
  
  goPatientinfo(id: string, status: string) {
    this._Router.navigate(['/patient-info'], {
      queryParams: { id: id, status: status },
    });
  }

  getPatient() {
    this._PatientService.getPatientPage().subscribe({
      next: (res) => {
        console.log(res);
        this.patientData = res.content;
        this.pageSize = res.pageable.pageSize;
        this.pageNumber = res.pageable.pageNumber;
        this.totalElements = res.totalElements;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletePatient(id: number) {
    this._PatientService.deletePatient(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getPatient();
      },
      // error: (err) => {
      //   console.log(err);
      // },
    });
  }

  // pageChanged(event: number): void {
  //   this._PatientService.getPatientPage(event).subscribe({
  //     next: (res) => {
  //       this.patientData = res.content;
  //       this.pageSize = res.pageable.pageSize;
  //       this.pageNumber = res.pageable.pageNumber;
  //       this.totalElements = res.totalElements;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
