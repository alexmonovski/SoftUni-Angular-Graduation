import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedUsersComponent } from './subscribed-users.component';

describe('SubscribedUsersComponent', () => {
  let component: SubscribedUsersComponent;
  let fixture: ComponentFixture<SubscribedUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribedUsersComponent]
    });
    fixture = TestBed.createComponent(SubscribedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
