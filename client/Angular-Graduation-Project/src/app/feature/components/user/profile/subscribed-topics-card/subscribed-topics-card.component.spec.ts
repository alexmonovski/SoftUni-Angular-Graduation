import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedTopicsCardComponent } from './subscribed-topics-card.component';

describe('TopicsSubscribedCardComponent', () => {
  let component: SubscribedTopicsCardComponent;
  let fixture: ComponentFixture<SubscribedTopicsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribedTopicsCardComponent]
    });
    fixture = TestBed.createComponent(SubscribedTopicsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
