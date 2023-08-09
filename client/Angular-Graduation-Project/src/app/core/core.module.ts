import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorCardComponent } from './error-card/error-card.component';

@NgModule({
  declarations: [ErrorCardComponent],
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
