import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DarkModeToggleComponent } from './components/dark-mode-toggle/dark-mode-toggle.component';
import { AboutComponent } from './components/about/about.component';
import { ErrorComponent } from './components/error/error.component';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DarkModeToggleComponent,
    AboutComponent,
    FooterComponent,
    ErrorComponent,
  ],
  imports: [CommonModule, MaterialModule, AppRoutingModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    DarkModeToggleComponent,
    AboutComponent,
    FooterComponent,
    ErrorComponent,
  ],
})
export class SharedModule { }
