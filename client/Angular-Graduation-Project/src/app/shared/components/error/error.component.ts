import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
// a vessel for the error; takes the error information from the MAT_SNACK_BAR_DATA through injection
//! turned out I don't need it.
export class ErrorComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
  get errorMessage() {
    return this.data.errorMessage;
  }
}
