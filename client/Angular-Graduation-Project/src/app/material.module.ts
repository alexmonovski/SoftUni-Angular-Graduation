import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatStepperModule,
    MatChipsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    TextFieldModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatStepperModule,
    MatChipsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    TextFieldModule,
  ],
})
export class MaterialModule {}
