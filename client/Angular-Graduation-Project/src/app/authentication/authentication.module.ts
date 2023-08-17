import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserCardComponent } from './components/user-card/user-card.component';
import { FeatureModule } from '../feature/feature.module';
import { UsersComponent } from './components/users/users.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileUserCardComponent } from './components/profile/profile-user-card/profile-user-card.component';
import { CreatedArticlesCardComponent } from './components/profile/created-articles-card/created-articles-card.component';
import { TopicsSubscribedCardComponent } from './components/profile/topics-subscribed-card/topics-subscribed-card.component';
import { SubscribedUsersCardComponent } from './components/profile/subscribed-users-card/subscribed-users-card.component';
import { LikedArticlesCardComponent } from './components/profile/liked-articles-card/liked-articles-card.component';

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
    LikedArticlesCardComponent,
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
export class AuthenticationModule {}
