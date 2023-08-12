import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AboutComponent } from './shared/about/about.component';
import { ProfileComponent } from './authentication/profile/profile.component';
import { ArticleDetailsComponent } from './feature/article/article-details/article-details.component';
import { ArticleCreateComponent } from './feature/article/article-create/article-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'articles/create', component: ArticleCreateComponent },
  { path: 'articles/:id', component: ArticleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
