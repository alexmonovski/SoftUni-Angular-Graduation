import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { LikeCardComponent } from './profile/liked-articles/like-card/like-card.component';
import { LikedArticlesComponent } from './profile/liked-articles/liked-articles.component';
import { SubscribedUsersComponent } from './profile/subscribed-users/subscribed-users.component';
import { SubscriptionCardComponent } from './profile/subscribed-users/subscription-card/subscription-card.component';
import { UserCardComponent } from './user-card/user-card.component';
import { FeatureModule } from '../feature/feature.module';
import { UsersComponent } from './users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { CreatedArticlesComponent } from './profile/created-articles/created-articles.component';
import { ProfileUserCardComponent } from './profile/user-card/profile-user-card.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    LikeCardComponent,
    LikedArticlesComponent,
    SubscribedUsersComponent,
    SubscriptionCardComponent,
    UserCardComponent,
    UsersComponent,
    CreatedArticlesComponent,
    ProfileUserCardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FeatureModule,
    RouterModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    LikeCardComponent,
    LikedArticlesComponent,
    SubscribedUsersComponent,
    SubscriptionCardComponent,
  ],
})
export class AuthenticationModule {}
