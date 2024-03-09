import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from '../../search.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { DoctorsService } from '../../services/doctors/doctors.service';
import { CasesService } from '../../services/cases/cases.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SearchPipe,
    FormsModule,
    NgxPaginationModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(
    private _DoctorsService: DoctorsService,
    private _CasesService: CasesService
  ) {}
  dashTable: any[] = [];
  cardData: any[] = [];
  searchvalue: string = '';
  currentDate: Date = new Date();

  ngOnInit(): void {
    this._CasesService.getStatisticsByDate(this.currentDate).subscribe({
      next:(res)=>{
        console.log();
        
      }
    })


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
