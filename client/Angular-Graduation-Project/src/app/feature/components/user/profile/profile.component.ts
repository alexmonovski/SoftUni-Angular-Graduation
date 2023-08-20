import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/iuser';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isOwner = false;
  ownerId!: string;
  owner: IUser | undefined;
  useForSubscriptions = true;

  constructor(
    private apiCalls: ApiCallsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit() {
    // use params, because component may reload with new data
    this.route.params
      .pipe(
        switchMap((params) => {
          this.ownerId = params['id'];
          return this.apiCalls.getSingleUserLean(this.ownerId);
        }),
        switchMap((response: { user: IUser }) => {
          this.owner = response.user;
          return this.authService.sessionObservable$;
        }),
        catchError((err) => {
          console.error(err);
          this.errorHandlerService.setErrorMessage(
            'An error occurred: ' + err.message
          );
          return of(null);
        })
      )
      .subscribe({
        next: (loggedInUser: IUser | null) => {
          if (loggedInUser) {
            this.isOwner = loggedInUser._id == this.ownerId;
          } else {
            this.isOwner = false;
          }
        },
        error: (err) => {
          this.errorHandlerService.setErrorMessage(
            'An error occurred: ' + err.message
          );
          console.error(err);
        },
        complete: () => {},
      });
  }

  onEdit() {
    if (this.isOwner) {
      const observables = (this.owner?.topics || []).map((topic: string) => {
        return this.apiCalls.getSingleTopic(topic).pipe(
          catchError((err) => {
            console.error('we are here');

            this.errorHandlerService.setErrorMessage(
              'An error occurred: ' + err.message
            );
            return of(null);
          }),
          map((data) => {
            return data?.topic.name;
          })
        );
      });

      forkJoin(observables).subscribe({
        next: (topicNames) => {
          topicNames.filter((name) => name !== null);
          this.router.navigate([`/auth/profile/${this.owner?._id}/edit`], {
            state: {
              user: this.owner,
              topics: topicNames,
            },
          });
        },
        error: (err) => {
          console.error(err);
          this.errorHandlerService.setErrorMessage(
            'An error occurred: ' + err.message
          );
        },
        complete: () => {},
      });
    } else {
      return;
    }
  }
}
