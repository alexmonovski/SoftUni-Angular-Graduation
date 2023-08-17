import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { ApiCallsService } from 'src/app/core/services/api-calls.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  isOwner: any;
  ownerId: any;

  constructor(
    private apiCalls: ApiCallsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // use params, because component may reload with new data
    this.route.params
      .pipe(
        switchMap((params) => {
          // сетваш кой е собственика на страницата
          this.ownerId = params['id'];
          // вземаме собственика на страницата
          return this.apiCalls.getSingleUserLean(this.ownerId);
        }),
        switchMap((response) => {
          // популираме собственика на страницата
          this.user = response.user;
          // събваме към сесията. така ще разберем дали имаме потребител и кой точно е влязъл
          return this.authService.sessionObservable$;
        })
      )
      .subscribe({
        next: (user: any | null) => {
          if (user) {
            // проверка дали собственика си гледа собствения профил
            this.isOwner = this.user._id == this.ownerId;
          } else {
            // няма как да е собственик, ако е Logout
            this.isOwner = false;
          }
        },
        error: (err) => console.error(err),
        complete: () => {},
      });
  }

  onEdit() {
    if (this.isOwner) {
      const observables = this.user.topics.map((topic: any) => {
        return this.apiCalls.getSingleTopic(topic).pipe(
          catchError(() => of(null)),
          // transform the emitted values; we only care about the name
          map((data) => {
            return data.topic.name;
          })
        );
      });
      // merge the last emitted vals of the previous observables in an array and emmit that array
      forkJoin(observables).subscribe({
        next: (topicNames: any) => {
          // remove null vals if errors in the previous observables
          topicNames = topicNames?.filter((name: any) => name !== null);
          this.router.navigate([`/auth/profile/${this.user._id}/edit`], {
            state: {
              user: this.user,
              topics: topicNames,
            },
          });
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {},
      });
    } else {
      return;
    }
  }
}
