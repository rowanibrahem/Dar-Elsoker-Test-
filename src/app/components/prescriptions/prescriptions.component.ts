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

  constructor(
    private _PrescriptionsService: PrescriptionsService,
    private _Active: ActivatedRoute,
    private _printService: NgxPrintService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getMedicine();

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
      dose: null,
      period: null,
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
            // openNewTab: false ,
            // bodyClass:'!w-[100px] !h-[100px]' ,
          });
          this._printService.print(customPrintOptions);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
