import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleListComponent } from './article/article-list/article-list.component';
import { ArticleDetailsComponent } from './article/article-details/article-details.component';
import { MatCardModule } from '@angular/material/card';
import { ArticleCommentsComponent } from './article/article-comments/article-comments.component';
import { MaterialModule } from '../material.module';
import { HomeComponent } from './home/home.component';
import { ArticleCardComponent } from './article/article-card/article-card.component';
import { CoreModule } from '../core/core.module';
import { AppRoutingModule } from '../app-routing.module';
import { ArticleCreateComponent } from './article/article-create/article-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { JoditAngularModule } from 'jodit-angular';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailsComponent,
    ArticleCommentsComponent,
    HomeComponent,
    ArticleCardComponent,
    ArticleCreateComponent,
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
  ],
  exports: [
    ArticleListComponent,
    ArticleDetailsComponent,
    ArticleCommentsComponent,
    HomeComponent,
    ArticleCardComponent,
  ],
})
export class FeatureModule {}
