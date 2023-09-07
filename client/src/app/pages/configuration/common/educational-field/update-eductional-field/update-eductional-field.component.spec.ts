import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEductionalFieldComponent } from './update-eductional-field.component';

describe('UpdateEductionalFieldComponent', () => {
  let component: UpdateEductionalFieldComponent;
  let fixture: ComponentFixture<UpdateEductionalFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEductionalFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEductionalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
