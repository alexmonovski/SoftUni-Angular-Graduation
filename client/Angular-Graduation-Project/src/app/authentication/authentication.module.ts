import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { UserCardComponent } from './user-card/user-card.component';
import { FeatureModule } from '../feature/feature.module';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { ProfileUserCardComponent } from './profile/profile-user-card/profile-user-card.component';
import { CreatedArticlesCardComponent } from './profile/created-articles-card/created-articles-card.component';
import { TopicsSubscribedCardComponent } from './profile/topics-subscribed-card/topics-subscribed-card.component';
import { ArticlesLikedCardComponent } from './profile/articles-liked-card/articles-liked-card.component';
import { SubscribedUsersCardComponent } from './profile/subscribed-users-card/subscribed-users-card.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,

    UserCardComponent,
    UsersComponent,
    ProfileUserCardComponent,
    CreatedArticlesCardComponent,
    TopicsSubscribedCardComponent,
    ArticlesLikedCardComponent,
    SubscribedUsersCardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FeatureModule,
    RouterModule,
  ],
  exports: [LoginComponent, RegisterComponent, ProfileComponent],
})
export class AuthenticationModule { }
