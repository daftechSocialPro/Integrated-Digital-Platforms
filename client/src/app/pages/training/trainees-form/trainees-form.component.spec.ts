import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineesFormComponent } from './trainees-form.component';

describe('TraineesFormComponent', () => {
  let component: TraineesFormComponent;
  let fixture: ComponentFixture<TraineesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
