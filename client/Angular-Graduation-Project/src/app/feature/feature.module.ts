import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailsComponent } from './article/article-details/article-details.component';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from '../material.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleCardComponent } from './article/article-card/article-card.component';
import { CoreModule } from '../core/core.module';
import { AppRoutingModule } from '../app-routing.module';
import { ArticleCreateComponent } from './article/article-create/article-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { JoditAngularModule } from 'jodit-angular';
import { ArticleTopicsComponent } from './article/article-details/article-topics/article-topics.component';
import { ArticleLikesComponent } from './article/article-details/article-likes/article-likes.component';
import { ArticleCommentsComponent } from './article/article-details/article-comments/article-comments.component';
import { ArticleCommentFormComponent } from './article/article-details/article-comments/article-comment-form/article-comment-form.component';

@NgModule({
  declarations: [
    ArticleDetailsComponent,
    ArticleCommentsComponent,
    ArticleListComponent,
    ArticleCardComponent,
    ArticleCreateComponent,
    ArticleTopicsComponent,
    ArticleLikesComponent,
    ArticleCommentFormComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MaterialModule,
    CoreModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CKEditorModule,
    JoditAngularModule,
    FormsModule,
  ],
  exports: [
    ArticleDetailsComponent,
    ArticleCommentsComponent,
    ArticleListComponent,
    ArticleCardComponent,
  ],
})
export class FeatureModule {}
