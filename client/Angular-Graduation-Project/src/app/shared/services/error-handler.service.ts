import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private errorMessageSource = new Subject<string>();
  errorMessage$ = this.errorMessageSource.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  setErrorMessage(message: string) {
    this.errorMessageSource.next(message);
    this.displayError(message);
  }

  displayError(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 5000,
    });
  }
}
