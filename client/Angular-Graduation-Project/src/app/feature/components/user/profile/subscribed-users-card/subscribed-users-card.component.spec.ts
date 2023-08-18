import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedUsersCardComponent } from './subscribed-users-card.component';

describe('SubscribedUsersCardComponent', () => {
  let component: SubscribedUsersCardComponent;
  let fixture: ComponentFixture<SubscribedUsersCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribedUsersCardComponent]
    });
    fixture = TestBed.createComponent(SubscribedUsersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
