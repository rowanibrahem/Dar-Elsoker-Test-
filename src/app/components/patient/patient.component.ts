import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchPipe } from '../../search.pipe';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient/patient.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, SearchPipe, FormsModule,RouterLink],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
})
export class PatientComponent implements OnInit {
  searchvalue: string = '';
  patientData: any[] = [];

  constructor(private _PatientService: PatientService,private _Router:Router) {}

  ngOnInit(): void {
    this._PatientService.getPatient().subscribe({
      next: (res) => {
        console.log(res);
        this.patientData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
