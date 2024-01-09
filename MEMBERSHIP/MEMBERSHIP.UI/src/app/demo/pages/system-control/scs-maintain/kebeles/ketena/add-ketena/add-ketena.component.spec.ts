import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKetenaComponent } from './add-ketena.component';

describe('AddKetenaComponent', () => {
  let component: AddKetenaComponent;
  let fixture: ComponentFixture<AddKetenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddKetenaComponent]
    });
    fixture = TestBed.createComponent(AddKetenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
