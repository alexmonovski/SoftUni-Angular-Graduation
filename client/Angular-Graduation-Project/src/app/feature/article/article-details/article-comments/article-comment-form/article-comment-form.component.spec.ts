import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommentFormComponent } from './article-comment-form.component';

describe('ArticleCommentFormComponent', () => {
  let component: ArticleCommentFormComponent;
  let fixture: ComponentFixture<ArticleCommentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleCommentFormComponent]
    });
    fixture = TestBed.createComponent(ArticleCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
