import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmploymentHistoryComponent } from './add-employment-history.component';

describe('AddEmploymentHistoryComponent', () => {
  let component: AddEmploymentHistoryComponent;
  let fixture: ComponentFixture<AddEmploymentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmploymentHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmploymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
