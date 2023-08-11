import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorCardComponent } from './components/error-card/error-card.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JWTInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [ErrorCardComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
