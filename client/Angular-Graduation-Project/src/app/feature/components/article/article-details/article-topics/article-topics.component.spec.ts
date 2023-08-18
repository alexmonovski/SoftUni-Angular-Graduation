import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTopicsComponent } from './article-topics.component';

describe('ArticleTopicsComponent', () => {
  let component: ArticleTopicsComponent;
  let fixture: ComponentFixture<ArticleTopicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleTopicsComponent]
    });
    fixture = TestBed.createComponent(ArticleTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
