import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CasesService } from '../../services/cases/cases.service';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
})
export class PersonalInfoComponent {
  constructor(
    private _Location: Location,
    private _CasesService: CasesService
  ) {}

  detailsForm: FormGroup = new FormGroup({
    patient: new FormGroup({
      contactInfo: new FormGroup({
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        // email: new FormControl(null, [Validators.required, Validators.email]),
        phone: new FormControl(null),
        address: new FormControl(null),
      }),
      age: new FormControl(0),
    }),
    type: new FormControl('CHECKUP'),
    medicalRecord: new FormGroup({
      timeOfDiabetes: new FormControl(0.0),
      weight: new FormControl(0.0),
      diet: new FormControl(null),
      fastingBloodSugar: new FormControl(0),
      randomBloodSugar: new FormControl(0),
      cumulativeBloodSugar: new FormControl(0),
      kendy_examination: new FormControl(null),
      eye_examination: new FormControl(true),
      ecg: new FormControl(true),
      numbness: new FormControl(true),
      burnings: new FormControl(true),
      sting: new FormControl(true),
      coolerLimbs: new FormControl(true),
      muscleStrain: new FormControl(true),
    }),
  });

  saveVisit() {
    const visitData = this.detailsForm.value;
    // if (visitData != null) {
    this._CasesService.checkUP(visitData).subscribe({
      next: (res) => {
        this.goBack();
      },
    });
    // }
  }

  goBack() {
    this._Location.back();
  }
}
