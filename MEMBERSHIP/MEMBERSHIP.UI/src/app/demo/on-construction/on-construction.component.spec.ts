import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnConstructionComponent } from './on-construction.component';

describe('OnConstructionComponent', () => {
  let component: OnConstructionComponent;
  let fixture: ComponentFixture<OnConstructionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnConstructionComponent]
    });
    fixture = TestBed.createComponent(OnConstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
