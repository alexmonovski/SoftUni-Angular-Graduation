import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export function loginOrRegisterGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (authService.getJwt()) {
      router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  };
}
