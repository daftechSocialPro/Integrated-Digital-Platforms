import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEdcuationalFieldComponent } from './add-edcuational-field.component';

describe('AddEdcuationalFieldComponent', () => {
  let component: AddEdcuationalFieldComponent;
  let fixture: ComponentFixture<AddEdcuationalFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEdcuationalFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEdcuationalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
