import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  // the subject from which we emit the error to all interested component
  private errorMessageSource = new Subject<string>();
  errorMessage$ = this.errorMessageSource.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  // emmit the error message
  setErrorMessage(message: string) {
    this.errorMessageSource.next(message);
    this.displayError(message);
  }

  // open the snackbar with some data
  displayError(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
    });
  }
}
