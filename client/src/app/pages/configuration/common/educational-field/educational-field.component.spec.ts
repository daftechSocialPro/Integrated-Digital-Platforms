import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalFieldComponent } from './educational-field.component';

describe('EducationalFieldComponent', () => {
  let component: EducationalFieldComponent;
  let fixture: ComponentFixture<EducationalFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
