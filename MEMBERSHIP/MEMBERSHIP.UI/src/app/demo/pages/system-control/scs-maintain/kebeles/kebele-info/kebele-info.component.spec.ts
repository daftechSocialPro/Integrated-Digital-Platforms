import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KebeleInfoComponent } from './kebele-info.component';

describe('KebeleInfoComponent', () => {
  let component: KebeleInfoComponent;
  let fixture: ComponentFixture<KebeleInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KebeleInfoComponent]
    });
    fixture = TestBed.createComponent(KebeleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
