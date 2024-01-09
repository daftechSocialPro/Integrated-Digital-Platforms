import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScsInterfaceComponent } from './add-scs-interface.component';

describe('AddScsInterfaceComponent', () => {
  let component: AddScsInterfaceComponent;
  let fixture: ComponentFixture<AddScsInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddScsInterfaceComponent]
    });
    fixture = TestBed.createComponent(AddScsInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
