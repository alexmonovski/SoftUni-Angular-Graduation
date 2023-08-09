import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile/profile.component';
import { SubscribedUsersComponent } from './profile/subscribed-users/subscribed-users.component';
import { LikedArticlesComponent } from './profile/liked-articles/liked-articles.component';
import { LikeCardComponent } from './profile/liked-articles/like-card/like-card.component';
import { SubscriptionCardComponent } from './profile/subscribed-users/subscription-card/subscription-card.component';
import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleCardComponent } from './article/article-card/article-card.component';
import { ArticleDetailsComponent } from './article/article-details/article-details.component';
import { MatCardModule } from '@angular/material/card';
import { ArticleCommentsComponent } from './article/article-comments/article-comments.component';
import { UserCardComponent } from './profile/user-card/user-card.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    ProfileComponent,
    SubscribedUsersComponent,
    LikedArticlesComponent,
    LikeCardComponent,
    SubscriptionCardComponent,
    ArticleListComponent,
    ArticleCardComponent,
    ArticleDetailsComponent,
    ArticleCommentsComponent,
    UserCardComponent,
  ],
  imports: [CommonModule, MatCardModule, MaterialModule],
  exports: [
    ProfileComponent,
    SubscribedUsersComponent,
    LikedArticlesComponent,
    LikeCardComponent,
    SubscriptionCardComponent,
    ArticleListComponent,
    ArticleCardComponent,
    ArticleDetailsComponent,
    UserCardComponent,
  ],
})
export class FeatureModule {}
