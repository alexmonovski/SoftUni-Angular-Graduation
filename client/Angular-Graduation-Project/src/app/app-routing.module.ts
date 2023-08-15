import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './authentication/components/login/login.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { AboutComponent } from './shared/about/about.component';
import { ArticleDetailsComponent } from './feature/article/article-details/article-details.component';
import { ArticleCreateComponent } from './feature/article/article-create/article-create.component';
import { UsersComponent } from './authentication/components/users/users.component';
import { ArticleListComponent } from './feature/article-list/article-list.component';
import { ProfileComponent } from './authentication/components/profile/profile.component';
import { ArticleCommentFormComponent } from './feature/article/article-details/article-comments/article-comment-form/article-comment-form.component';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'auth', component: UsersComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/profile/:id', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'articles/create', component: ArticleCreateComponent },
  { path: 'articles/:id', component: ArticleDetailsComponent },
  { path: 'articles/:id/add-comment', component: ArticleCommentFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
