import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLikesComponent } from './article-likes.component';

describe('ArticleLikesComponent', () => {
  let component: ArticleLikesComponent;
  let fixture: ComponentFixture<ArticleLikesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleLikesComponent]
    });
    fixture = TestBed.createComponent(ArticleLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
