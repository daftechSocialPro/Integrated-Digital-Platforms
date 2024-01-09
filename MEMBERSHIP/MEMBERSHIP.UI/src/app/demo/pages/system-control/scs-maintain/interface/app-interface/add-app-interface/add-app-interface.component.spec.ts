import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppInterfaceComponent } from './add-app-interface.component';

describe('AddAppInterfaceComponent', () => {
  let component: AddAppInterfaceComponent;
  let fixture: ComponentFixture<AddAppInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAppInterfaceComponent]
    });
    fixture = TestBed.createComponent(AddAppInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
