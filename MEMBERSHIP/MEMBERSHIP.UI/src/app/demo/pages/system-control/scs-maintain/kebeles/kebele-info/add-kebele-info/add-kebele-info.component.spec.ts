import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKebeleInfoComponent } from './add-kebele-info.component';

describe('AddKebeleInfoComponent', () => {
  let component: AddKebeleInfoComponent;
  let fixture: ComponentFixture<AddKebeleInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddKebeleInfoComponent]
    });
    fixture = TestBed.createComponent(AddKebeleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
