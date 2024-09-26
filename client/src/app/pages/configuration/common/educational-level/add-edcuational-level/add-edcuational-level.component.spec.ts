import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEdcuationalLevelComponent } from './add-edcuational-level.component';

describe('AddEdcuationalLevelComponent', () => {
  let component: AddEdcuationalLevelComponent;
  let fixture: ComponentFixture<AddEdcuationalLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEdcuationalLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEdcuationalLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
