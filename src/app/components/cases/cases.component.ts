import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases/cases.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cases.component.html',
  styleUrl: './cases.component.css',
})
export class CasesComponent implements OnInit {
  constructor(private _CasesService: CasesService, private _Router: Router) {}
  appoitmentData: any[] = [];
  ngOnInit(): void {
    // this._CasesService.getAllApointment().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.appoitmentData = res;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  goInfo() {
    this._Router.navigate(['/patient-info']);
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
