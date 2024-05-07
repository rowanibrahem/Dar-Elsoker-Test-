import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxPrintModule, NgxPrintService, PrintOptions } from 'ngx-print';
import { PrescriptionsService } from '../../services/prescriptions/prescriptions.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ActivatedRoute } from '@angular/router';
import { CasesService } from '../../services/cases/cases.service';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgxPrintModule, NzSelectModule],
  templateUrl: './prescriptions.component.html',
  styleUrl: './prescriptions.component.css',
})
export class PrescriptionsComponent implements OnInit {
  medicineId: number = 0;
  visitId: string | null = this._Active.snapshot.queryParamMap.get('id');
  medicinies: any;
  form!: FormGroup;
  prescriptions: any[] = [];
  patientData: any[] = [];

  constructor(
    private _PrescriptionsService: PrescriptionsService,
    private _CasesService: CasesService,
    private _Active: ActivatedRoute,
    private _printService: NgxPrintService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getMedicine();
    this.getVisitById();
    this.form = this.fb.group({
      inputs: this.fb.array([this.createInputGroup()]),
    });
  }

  get inputGroups() {
    return this.form.get('inputs') as FormArray;
  }

  createInputGroup() {
    return this.fb.group({
      type: null,
      medicine: null,
      dose: '',
      period: '',
    });
  }

  getMedicine() {
    this._PrescriptionsService.getMedicine().subscribe({
      next: (res) => {
        console.log(res);
        this.medicinies = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getMedicineId(event: any) {
    console.log(event);

    this.medicineId = event;
  }

  addMedicine() {
    this.inputGroups.push(this.createInputGroup());
  }

  getVisitById() {
    this._CasesService.getVisitById(this.visitId).subscribe({
      next: (res) => {
        console.log(res);
        this.patientData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  print() {
    this._PrescriptionsService
      .addMedicine(
        this.visitId,
        this.medicineId,
        this.form.value.dose,
        this.form.value.period
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.prescriptions = res;
          const customPrintOptions: PrintOptions = new PrintOptions({
            printSectionId: 'print-section',
          });
          this._printService.print(customPrintOptions);
          // window.print();
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
