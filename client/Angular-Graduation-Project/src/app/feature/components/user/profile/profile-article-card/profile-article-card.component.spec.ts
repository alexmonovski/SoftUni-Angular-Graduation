import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileArticleCardComponent } from './profile-article-card.component';

describe('ProfileArticleCardComponent', () => {
  let component: ProfileArticleCardComponent;
  let fixture: ComponentFixture<ProfileArticleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileArticleCardComponent]
    });
    fixture = TestBed.createComponent(ProfileArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
