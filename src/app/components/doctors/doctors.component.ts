import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { SearchPipe } from '../../search.pipe';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DoctorsService } from '../../services/doctors/doctors.service';
import { initFlowbite } from 'flowbite';

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
  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  menu: any;
  constructor(private _DoctorsService: DoctorsService, _Renderer2: Renderer2) {}
  ngOnInit(): void {
    this.currentDate.toLocaleDateString();
    this.getAllDoctors();
    this.savedoctor();
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

  doctorForm: FormGroup = new FormGroup({
    contactInfo: new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null),
      address: new FormControl(null),
    }),
    specialization: new FormControl(null),
    qualification: new FormControl(null),
  });

  savedoctor(): void {
    const doctorData = this.doctorForm.value;
    if (doctorData != null) {
      this._DoctorsService.saveDoctor(doctorData).subscribe({
        next: (res) => {
          console.log(res);
          this.doctorsData = res;
          this.getAllDoctors();

        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
