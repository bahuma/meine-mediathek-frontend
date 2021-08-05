import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPreviewComponent } from './subscription-preview.component';

describe('SubscriptionPreviewComponent', () => {
  let component: SubscriptionPreviewComponent;
  let fixture: ComponentFixture<SubscriptionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
