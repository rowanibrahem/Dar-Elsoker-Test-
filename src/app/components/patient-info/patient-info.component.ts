import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-info',
  standalone: true,
  imports: [],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.css',
})
export class PatientInfoComponent {
  constructor(private _Router: Router, private _Location: Location) {}
  goBack() {
    this._Location.back();
  }
}
