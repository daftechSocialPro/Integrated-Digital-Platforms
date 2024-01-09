import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsInterfaceComponent } from './scs-interface.component';

describe('ScsInterfaceComponent', () => {
  let component: ScsInterfaceComponent;
  let fixture: ComponentFixture<ScsInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsInterfaceComponent]
    });
    fixture = TestBed.createComponent(ScsInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
