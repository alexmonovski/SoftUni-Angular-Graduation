import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsSubscribedCardComponent } from './topics-subscribed-card.component';

describe('TopicsSubscribedCardComponent', () => {
  let component: TopicsSubscribedCardComponent;
  let fixture: ComponentFixture<TopicsSubscribedCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopicsSubscribedCardComponent]
    });
    fixture = TestBed.createComponent(TopicsSubscribedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
