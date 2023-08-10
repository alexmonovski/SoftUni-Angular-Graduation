import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorCardComponent } from './error-card/error-card.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ErrorCardComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [CommonModule],
})
export class CoreModule {}
