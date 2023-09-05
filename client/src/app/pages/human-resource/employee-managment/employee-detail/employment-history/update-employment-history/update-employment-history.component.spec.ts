import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmploymentHistoryComponent } from './update-employment-history.component';

describe('UpdateEmploymentHistoryComponent', () => {
  let component: UpdateEmploymentHistoryComponent;
  let fixture: ComponentFixture<UpdateEmploymentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmploymentHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmploymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
