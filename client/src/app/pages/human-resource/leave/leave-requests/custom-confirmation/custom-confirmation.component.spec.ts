import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomConfirmationComponent } from './custom-confirmation.component';

describe('CustomConfirmationComponent', () => {
  let component: CustomConfirmationComponent;
  let fixture: ComponentFixture<CustomConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
