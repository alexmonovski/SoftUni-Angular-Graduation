import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommentComponent } from './article-comment.component';

describe('ArticleCommentFormComponent', () => {
  let component: ArticleCommentComponent;
  let fixture: ComponentFixture<ArticleCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleCommentComponent]
    });
    fixture = TestBed.createComponent(ArticleCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
