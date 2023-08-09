import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/core/dark-mode.service';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.css'],
})
export class DarkModeToggleComponent {
  constructor(private darkModeService: DarkModeService) {}

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
