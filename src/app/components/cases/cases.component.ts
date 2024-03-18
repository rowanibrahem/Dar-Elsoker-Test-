import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases/cases.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './cases.component.html',
  styleUrl: './cases.component.css',
})
export class CasesComponent implements OnInit {
  constructor(
    private _CasesService: CasesService,
    private _Router: Router,
    private _active: ActivatedRoute
  ) {}
  value: string | null = 'ALL';
  visitsData: any[] = [];
  pageSize: number = 0;
  pageNumber: number = 0;
  totalElements: number = 0;

  ngOnInit(): void {
    this.getVisit();
    this.getVisitsByStatus();
  }

  getVisitsByStatus() {
    this.value = this._active.snapshot.queryParamMap.get('value');
    // this._CasesService.allByDateAndStatus(this.todayDate,this.value).subscribe
  }

  getVisit() {
    this._CasesService.getVisitsPage().subscribe({
      next: (res) => {
        this.visitsData = res.content;
        this.pageSize = res.pageable.pageSize;
        this.pageNumber = res.pageable.pageNumber;
        this.totalElements = res.totalElements;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  pageChanged(event: number): void {
    this._CasesService.getVisitsPage(event).subscribe({
      next: (res) => {
        this.visitsData = res.content;
        this.pageSize = res.pageable.pageSize;
        this.pageNumber = res.pageable.pageNumber;
        this.totalElements = res.totalElements;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goInfo() {
    this._Router.navigate(['/patient-info']);
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
