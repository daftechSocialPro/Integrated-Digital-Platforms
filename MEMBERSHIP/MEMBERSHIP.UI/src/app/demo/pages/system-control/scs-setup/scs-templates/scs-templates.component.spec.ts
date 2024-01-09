import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsTemplatesComponent } from './scs-templates.component';

describe('ScsTemplatesComponent', () => {
  let component: ScsTemplatesComponent;
  let fixture: ComponentFixture<ScsTemplatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsTemplatesComponent]
    });
    fixture = TestBed.createComponent(ScsTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
