import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KebelesComponent } from './kebeles.component';

describe('KebelesComponent', () => {
  let component: KebelesComponent;
  let fixture: ComponentFixture<KebelesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KebelesComponent]
    });
    fixture = TestBed.createComponent(KebelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
