import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonthsComponent } from './add-months.component';

describe('AddMonthsComponent', () => {
  let component: AddMonthsComponent;
  let fixture: ComponentFixture<AddMonthsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMonthsComponent]
    });
    fixture = TestBed.createComponent(AddMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
