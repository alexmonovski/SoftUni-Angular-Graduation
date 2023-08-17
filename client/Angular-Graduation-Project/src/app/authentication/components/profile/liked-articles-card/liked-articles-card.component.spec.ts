import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedArticlesCardComponent } from './liked-articles-card.component';

describe('ArticlesLikedCardComponent', () => {
  let component: LikedArticlesCardComponent;
  let fixture: ComponentFixture<LikedArticlesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikedArticlesCardComponent],
    });
    fixture = TestBed.createComponent(LikedArticlesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
