import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldNameComponent } from './field-name.component';

describe('FieldNameComponent', () => {
  let component: FieldNameComponent;
  let fixture: ComponentFixture<FieldNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldNameComponent]
    });
    fixture = TestBed.createComponent(FieldNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
