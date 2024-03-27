import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient/patient.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CasesService } from '../../services/cases/cases.service';

@Component({
  selector: 'app-patient-info',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.css',
})
export class PatientInfoComponent implements OnInit {
  constructor(
    private _Router: Router,
    private _Location: Location,
    private _PatientService: PatientService,
    private _CasesService: CasesService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  patientId: string | null =
    this._ActivatedRoute.snapshot.queryParamMap.get('id');
  status: string | null =
    this._ActivatedRoute.snapshot.queryParamMap.get('status');
  patientData: any;
  disaple: boolean = false;

  ngOnInit(): void {
    // this.status === 'FOLLOWUP'
    //   ? (this.disaple = false)
    //   : this.getPatientRecords();
  }

  goBack() {
    this._Location.back();
  }

  recordForm: FormGroup = new FormGroup({
    patient: new FormGroup({
      id: new FormControl(this.patientId),
    }),
    type: new FormControl('FOLLOW_UP'),
    medicalRecord: new FormGroup({
      timeOfDiabetes: new FormControl(''),
      height: new FormControl(),
      weight: new FormControl(''),
      medications: new FormControl(''),
      diet: new FormControl(''),
      bloodTestDate: new FormControl(''),
      fastingBloodSugar: new FormControl(''),
      fastingBloodSugarTested: new FormControl(''),
      randomBloodSugar: new FormControl(''),
      randomBloodSugarTested: new FormControl(''),
      cumulativeBloodSugar: new FormControl(''),
      cumulativeBloodSugarTested: new FormControl(''),
      kendyExamination: new FormControl(''),
      kendyExaminationTested: new FormControl(''),
      kendyExaminationDate: new FormControl(''),
      eyeExamination: new FormControl(''),
      eyeExaminationDate: new FormControl(''),
      ecg: new FormControl(''),
      ecgDate: new FormControl(''),
      numbness: new FormControl(''),
      burnings: new FormControl(''),
      sting: new FormControl(''),
      coolerLimbs: new FormControl(''),
      muscleStrain: new FormControl(''),
    }),
  });

  saveVisit() {
    const visitData = this.recordForm.value;
    this._CasesService.checkUP(visitData).subscribe({
      next: (res) => {
        console.log(res);
        console.log(visitData);
        this.goBack();
      },
    });
  }

  // getPatientRecords(value: boolean = true) {
  //   this.disaple = value;
  //   this._CasesService.getPatientMedicalRecords(this.patientId).subscribe({
  //     next: (res) => {
  //       // console.log(res);

  //       this.patientData = res;
  //       console.log(this.patientData);

  //       this.recordForm.patchValue({
  //         weight: this.patientData.medicalRecord.weight,
  //         medications: this.patientData.medicalRecord.medications,
  //         diet: this.patientData.medicalRecord.diet,
  //         bloodTestDate: this.patientData.medicalRecord.bloodTestDate,
  //         fastingBloodSugar: this.patientData.medicalRecord.fastingBloodSugar,
  //         fastingBloodSugarTested:
  //           this.patientData.medicalRecord.fastingBloodSugarTested,
  //         randomBloodSugar: this.patientData.medicalRecord.randomBloodSugar,
  //         randomBloodSugarTested:
  //           this.patientData.medicalRecord.randomBloodSugarTested,
  //         cumulativeBloodSugar:
  //           this.patientData.medicalRecord.cumulativeBloodSugar,
  //         cumulativeBloodSugarTested:
  //           this.patientData.medicalRecord.cumulativeBloodSugarTested,
  //         kendyExamination: this.patientData.medicalRecord.kendyExamination,
  //         kendyExaminationTested:
  //           this.patientData.medicalRecord.kendyExaminationTested,
  //         eyeExamination: this.patientData.medicalRecord.eyeExamination,
  //         ecg: this.patientData.medicalRecord.ecg,
  //         numbness: this.patientData.medicalRecord.numbness,
  //         burnings: this.patientData.medicalRecord.burnings,
  //         sting: this.patientData.medicalRecord.sting,
  //         coolerLimbs: this.patientData.medicalRecord.coolerLimbs,
  //         muscleStrain: this.patientData.medicalRecord.muscleStrain,
  //       });
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
