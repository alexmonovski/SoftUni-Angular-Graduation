import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from '../material.module';
import { CoreModule } from '../core/core.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { ArticleCommentsComponent } from './components/article/article-details/article-comments/article-comments.component';
import { ArticleDetailsComponent } from './components/article/article-details/article-details.component';
import { ArticleCreateComponent } from './components/article/article-create/article-create.component';
import { ArticleCardComponent } from './components/article/article-card/article-card.component';
import { ArticleTopicsComponent } from './components/article/article-details/article-topics/article-topics.component';
import { ArticleCommentComponent } from './components/article/article-details/article-comments/article-comment/article-comment.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserCardComponent } from './components/user/user-list/user-card/user-card.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { CreatedArticlesCardComponent } from './components/user/profile/created-articles-card/created-articles-card.component';
import { LikedArticlesCardComponent } from './components/user/profile/liked-articles-card/liked-articles-card.component';
import { ProfileUserCardComponent } from './components/user/profile/profile-user-card/profile-user-card.component';
import { SubscribedUsersCardComponent } from './components/user/profile/subscribed-users-card/subscribed-users-card.component';
import { SubscribedTopicsCardComponent } from './components/user/profile/subscribed-topics-card/subscribed-topics-card.component';




@NgModule({
  declarations: [
    ArticleDetailsComponent,
    ArticleCommentsComponent,
    ArticleListComponent,
    ArticleCardComponent,
    ArticleCreateComponent,
    ArticleTopicsComponent,
    ArticleCommentComponent,
    UserListComponent,
    UserCardComponent,
    ProfileComponent,
    CreatedArticlesCardComponent,
    LikedArticlesCardComponent,
    ProfileUserCardComponent,
    SubscribedUsersCardComponent,
    SubscribedTopicsCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MaterialModule,
    CoreModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ArticleDetailsComponent,
    ArticleCommentsComponent,
    ArticleListComponent,
    ArticleCardComponent,
  ],
})
export class FeatureModule { }
