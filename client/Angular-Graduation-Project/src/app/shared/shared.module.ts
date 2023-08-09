import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DarkModeToggleComponent } from './dark-mode-toggle/dark-mode-toggle.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, DarkModeToggleComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, FooterComponent, DarkModeToggleComponent],
})
export class SharedModule {}
