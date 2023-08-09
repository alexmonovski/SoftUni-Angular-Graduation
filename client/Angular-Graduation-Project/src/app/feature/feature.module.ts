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
  ],
  imports: [CommonModule],
  exports: [
    ProfileComponent,
    SubscribedUsersComponent,
    LikedArticlesComponent,
    LikeCardComponent,
    SubscriptionCardComponent,
    ArticleListComponent,
    ArticleCardComponent,
    ArticleDetailsComponent,
  ],
})
export class FeatureModule {}
