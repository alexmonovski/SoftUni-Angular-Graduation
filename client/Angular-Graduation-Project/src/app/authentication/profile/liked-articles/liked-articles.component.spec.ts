import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedArticlesComponent } from './liked-articles.component';

describe('LikedArticlesComponent', () => {
  let component: LikedArticlesComponent;
  let fixture: ComponentFixture<LikedArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikedArticlesComponent]
    });
    fixture = TestBed.createComponent(LikedArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
