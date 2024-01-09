import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsCompanyComponent } from './scs-company.component';

describe('ScsCompanyComponent', () => {
  let component: ScsCompanyComponent;
  let fixture: ComponentFixture<ScsCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsCompanyComponent]
    });
    fixture = TestBed.createComponent(ScsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
