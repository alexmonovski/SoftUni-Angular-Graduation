import { ArticleCreateComponent } from './feature/components/article/article-create/article-create.component';
import { ProfileComponent } from './feature/components/user/profile/profile.component';
import { ArticleCommentComponent } from './feature/components/article/article-details/article-comments/article-comment/article-comment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './authentication/components/login/login.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { AboutComponent } from './shared/components/about/about.component';
import { loginOrRegisterGuard } from './shared/services/login-or-register-guard.service';
import { userAuthorizedGuard } from './shared/services/user-authorized-guard.service';
import { userMustBeAuthenticatedGuard } from './shared/services/user-must-be-authenticated-guard.service';
import { userMustNotBeAuthorGuard } from './shared/services/user-must-not-be-author-guard.service';
import { userMustBeAuthorGuard } from './shared/services/user-must-be-author-guard.service';
import { ArticleListComponent } from './feature/components/article/article-list/article-list.component';
import { ArticleDetailsComponent } from './feature/components/article/article-details/article-details.component';
import { UserListComponent } from './feature/components/user/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'auth', component: UserListComponent },
  // route guard for login: user must be not logged in; session must not exist;
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [loginOrRegisterGuard()],
  },
  // route guard for register: user must be not logged in; session must not exist; can use the same route guard;
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [loginOrRegisterGuard()],
  },
  { path: 'auth/profile/:id', component: ProfileComponent },

  // route guard for profile edit: user must be logged in; user._id must match the :id here: auth/profile/:id/edit
  {
    path: 'auth/profile/:id/edit',
    component: RegisterComponent,
    canActivate: [userAuthorizedGuard()],
  },

  { path: 'about', component: AboutComponent },
  // user must be logged in;
  {
    path: 'articles/create',
    component: ArticleCreateComponent,
    canActivate: [userMustBeAuthenticatedGuard()],
  },
  { path: 'articles/:id', component: ArticleDetailsComponent },
  // user must be logged in and must not be the article's author (article's author route contains an id. the user._id stored in the local storage must not match this one )
  {
    path: 'articles/:id/add-comment',
    component: ArticleCommentComponent,
  },
  // user must be logged in and must be the article's author (article's author route contains an id. the user._id stored in the local storage must match this one )
  {
    path: 'articles/:id/edit',
    component: ArticleCreateComponent,
    canActivate: [userMustBeAuthorGuard()],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
