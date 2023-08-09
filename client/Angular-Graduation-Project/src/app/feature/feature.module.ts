import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleDetailsComponent } from './article/article-details/article-details.component';
import { MatCardModule } from '@angular/material/card';
import { ArticleCommentsComponent } from './article/article-comments/article-comments.component';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home/home.component';
import { ArticleCardComponent } from './article/article-card/article-card.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailsComponent,
    ArticleCommentsComponent,
    HomeComponent,
    ArticleCardComponent,
  ],
  imports: [CommonModule, MatCardModule, MaterialModule],
  exports: [
    ArticleListComponent,
    ArticleDetailsComponent,
    ArticleCommentsComponent,
    HomeComponent,
    ArticleCardComponent,
  ],
})
export class FeatureModule {}
