import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedArticlesCardComponent } from './created-articles-card.component';

describe('CreatedArticlesCardComponent', () => {
  let component: CreatedArticlesCardComponent;
  let fixture: ComponentFixture<CreatedArticlesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatedArticlesCardComponent]
    });
    fixture = TestBed.createComponent(CreatedArticlesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
