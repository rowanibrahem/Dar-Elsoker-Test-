import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router
  ) {}
  patientId: any;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.patientId = params.get('id');
        console.log(this.patientId);
      },
    });
  }
  goBack() {
    this._Router.navigate(['/patient']);
  }

  patientInfo() {
    this._Router.navigate(['/patient-info']);
  }

  detailsForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    age: new FormControl(''),
    adress: new FormControl(''),
  });

  getPatient() {}
}
