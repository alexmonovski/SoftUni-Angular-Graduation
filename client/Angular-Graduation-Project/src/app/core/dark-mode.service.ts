import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkModeStyles();
  }

  private applyDarkModeStyles() {
    console.log('potato');

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  constructor() {}
}
