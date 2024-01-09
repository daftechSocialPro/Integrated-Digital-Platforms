import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceConfigComponent } from './interface-config.component';

describe('InterfaceConfigComponent', () => {
  let component: InterfaceConfigComponent;
  let fixture: ComponentFixture<InterfaceConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterfaceConfigComponent]
    });
    fixture = TestBed.createComponent(InterfaceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
