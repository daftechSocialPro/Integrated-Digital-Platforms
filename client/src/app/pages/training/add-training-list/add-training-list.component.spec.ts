import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingListComponent } from './add-training-list.component';

describe('AddTrainingListComponent', () => {
  let component: AddTrainingListComponent;
  let fixture: ComponentFixture<AddTrainingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrainingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrainingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
