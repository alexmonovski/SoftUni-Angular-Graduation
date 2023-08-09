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
import { UserCardComponent } from './profile/user-card/user-card.component';
import { FeatureModule } from '../feature/feature.module';

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
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FeatureModule],
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
