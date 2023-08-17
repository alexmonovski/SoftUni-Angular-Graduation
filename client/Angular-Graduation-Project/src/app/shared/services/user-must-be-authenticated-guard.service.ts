import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export function userMustBeAuthenticatedGuard(): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (authService.getJwt()) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  };
}
