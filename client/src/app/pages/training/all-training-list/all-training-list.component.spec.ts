import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTrainingListComponent } from './all-training-list.component';

describe('AllTrainingListComponent', () => {
  let component: AllTrainingListComponent;
  let fixture: ComponentFixture<AllTrainingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTrainingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTrainingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
