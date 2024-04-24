import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from "../../pipes/select-filter.pipe";

@Component({
    standalone: true,
    selector: 'app-custom-select',
    templateUrl: './custom-select.component.html',
    styleUrls: ['./custom-select.component.css'],
    imports: [FormsModule, CommonModule, FilterPipe]
})
export class CustomSelectComponent {
  @Input() list: any[] = []; // The list of options
  @Input() selected: any; // The selected option
  @Output() selectedChange = new EventEmitter<any>(); // Event to emit the selected option

  searchTerm = '';

  selectOption(option: any) {
    this.selected = option.value;
    this.selectedChange.emit(this.selected);
  }
}
