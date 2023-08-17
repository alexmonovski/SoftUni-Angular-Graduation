import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export function userAuthorizedGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot) => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    const activatedRoute: ActivatedRouteSnapshot = route;
    const routeId = activatedRoute.params['id'];
    const userId = authService.getUserId() as { userId: any };

    if (userId.userId == routeId) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  };
}
