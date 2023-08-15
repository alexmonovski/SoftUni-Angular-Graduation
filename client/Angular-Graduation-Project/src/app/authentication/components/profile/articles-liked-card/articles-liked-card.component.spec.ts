import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesLikedCardComponent } from './articles-liked-card.component';

describe('ArticlesLikedCardComponent', () => {
  let component: ArticlesLikedCardComponent;
  let fixture: ComponentFixture<ArticlesLikedCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesLikedCardComponent]
    });
    fixture = TestBed.createComponent(ArticlesLikedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
