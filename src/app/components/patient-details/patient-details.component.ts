import { PatientService } from './../../services/patient/patient.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css',
})
export class PatientDetailsComponent implements OnInit {
  constructor(
    private _PatientService: PatientService,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}
  patientId: string | null =
    this._ActivatedRoute.snapshot.queryParamMap.get('id');
  status: string | null =
    this._ActivatedRoute.snapshot.queryParamMap.get('status');
  patientData: any;

  ngOnInit(): void {
    this.getPatient();
  }
  goBack() {
    this._Router.navigate(['/patient']);
  }

  patientInfo() {
    this._Router.navigate(['/patient-info'], {
      queryParams: { id: this.patientId },
    });
  }

  patientForm: FormGroup = new FormGroup({
    id: new FormControl(this.patientId),
    contactInfo: new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null),
      address: new FormControl(null),
    }),
    age: new FormControl(0),
  });

  updatePatient() {
    const patientData = this.patientForm.value;
    this._PatientService.updatePatient(patientData).subscribe({
      next: (res) => {
        console.log(res);
        this.goBack();
      },
    });
  }

  getPatient() {
    this._PatientService.getPatientById(this.patientId).subscribe({
      next: (res) => {
        console.log(res);
        this.patientData = res;
        this.patientForm.patchValue({
          contactInfo: {
            firstName: this.patientData.contactInfo.firstName,
            lastName: this.patientData.contactInfo.lastName,
            email: this.patientData.contactInfo.email,
            phone: this.patientData.contactInfo.phone,
            address: this.patientData.contactInfo.address,
          },
          age: this.patientData.age,
        });
      },
    });
  }
}
