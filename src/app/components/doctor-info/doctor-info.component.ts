import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DoctorsService } from '../../services/doctors/doctors.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './doctor-info.component.html',
  styleUrl: './doctor-info.component.css',
})
export class DoctorInfoComponent implements OnInit {
  doctorsData: any;
  disaple: boolean = false;
  status: string | null = this._active.snapshot.queryParamMap.get('status');
  doctorId: string | null = this._active.snapshot.queryParamMap.get('id');

  constructor(
    private _DoctorsService: DoctorsService,
    private _Location: Location,
    private _active: ActivatedRoute
  ) {}    

  ngOnInit(): void {
    this.getDoctorByID();
  }

  doctorForm: FormGroup = new FormGroup({
    fullName: new FormControl(''),
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
          this._Location.back();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  updateDoctor(): void {
    const doctorData = this.doctorForm.value;
    this._DoctorsService.reuseDoctor(doctorData, this.doctorId).subscribe({
      next: (res) => {
        console.log(res);
        this.doctorsData = res;
        this._Location.back();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getDoctorByID(value: boolean = true) {
    this.disaple = value;
    this._DoctorsService.getDoctorByID(this.doctorId).subscribe({
      next: (res) => {
        console.log(res);

        this.doctorsData = res;
        this.doctorForm.patchValue({
          contactInfo: {
            firstName: this.doctorsData.contactInfo.firstName,
            lastName: this.doctorsData.contactInfo.lastName,
            email: this.doctorsData.contactInfo.email,
            phone: this.doctorsData.contactInfo.phone,
            address: this.doctorsData.contactInfo.address,
          },
          specialization: this.doctorsData.specialization,
          qualification: this.doctorsData.qualification,
        });
        console.log(this.doctorForm);
      },
    });
  }

  goBack() {
    this._Location.back();
  }
}
