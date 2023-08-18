import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { map, tap } from 'rxjs/operators';

export function userMustBeAuthorGuard(): CanActivateFn {
  return (route: ActivatedRouteSnapshot) => {
    const authService: AuthService = inject(AuthService);
    const apiCallsService: ApiCallsService = inject(ApiCallsService);
    const router: Router = inject(Router);
    const activatedRoute: ActivatedRouteSnapshot = route;
    const routeId = activatedRoute.params['id'];
    const userId = authService.getUserId();

    return apiCallsService.getSingleArticleLean(routeId).pipe(
      tap((data) => {
        const articleAuthorId = data.article.author;
        if (userId?.userId != articleAuthorId) {
          router.navigate(['/']);
        }
      }),
      map(() => true) // Return true after tap
    );
  };
}
