import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedArticlesComponent } from './created-articles.component';

describe('CreatedArticlesComponent', () => {
  let component: CreatedArticlesComponent;
  let fixture: ComponentFixture<CreatedArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatedArticlesComponent]
    });
    fixture = TestBed.createComponent(CreatedArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
