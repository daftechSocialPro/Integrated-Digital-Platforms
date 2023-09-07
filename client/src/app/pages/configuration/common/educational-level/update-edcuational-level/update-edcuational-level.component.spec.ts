import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEdcuationalLevelComponent } from './update-edcuational-level.component';

describe('UpdateEdcuationalLevelComponent', () => {
  let component: UpdateEdcuationalLevelComponent;
  let fixture: ComponentFixture<UpdateEdcuationalLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEdcuationalLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEdcuationalLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
