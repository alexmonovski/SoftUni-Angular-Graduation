import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DarkModeToggleComponent } from './dark-mode-toggle/dark-mode-toggle.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DarkModeToggleComponent,
    AboutComponent,
    FooterComponent,
    ErrorComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    DarkModeToggleComponent,
    AboutComponent,
    FooterComponent,
    ErrorComponent,
  ],
})
export class SharedModule {}
