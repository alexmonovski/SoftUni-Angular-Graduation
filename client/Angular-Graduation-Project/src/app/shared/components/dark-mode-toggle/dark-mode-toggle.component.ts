import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/core/services/dark-mode.service';
import * as DarkReader from 'darkreader';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.css'],
})
export class DarkModeToggleComponent {
  isDarkModeEnabled: boolean = false;

  constructor(private darkModeService: DarkModeService) {}

  toggleDarkMode() {
    if (this.isDarkModeEnabled) {
      DarkReader.disable();
    } else {
      DarkReader.enable({
        brightness: 100,
        contrast: 90,
        sepia: 10,
      });
    }
    this.isDarkModeEnabled = !this.isDarkModeEnabled;
  }
}
