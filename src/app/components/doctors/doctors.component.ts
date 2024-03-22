import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { SearchPipe } from '../../pipes/search.pipe';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DoctorsService } from '../../services/doctors/doctors.service';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, SearchPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css',
})
export class DoctorsComponent implements OnInit {
  searchvalue: string = '';
  doctorsData: any[] = [];
  constructor(
    private _DoctorsService: DoctorsService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    this.getAllDoctors();
    initFlowbite();
  }

  getAllDoctors() {
    this._DoctorsService.getAllDoctor().subscribe({
      next: (res) => {
        this.doctorsData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletDoctor(id: number) {
    this._DoctorsService.deleteDoctor(id).subscribe({
      next: (res) => {
        this.getAllDoctors();
      },
    });
  }

  goWithId(status: string, id: string) {
    this._Router.navigate(['/doctor-info'], {
      queryParams: { status: status, id: id },
    });
  }

  getPatientRedirect(status: string, id: string) {
    this._Router.navigate(['/cases'], {
      queryParams: { status: status, id: id },
    });
  }
  goInfo() {
    this._Router.navigate(['/doctor-info'],{queryParams:{status:'save'}});
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
