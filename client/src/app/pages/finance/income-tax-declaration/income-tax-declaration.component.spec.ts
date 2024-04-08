import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTaxDeclarationComponent } from './income-tax-declaration.component';

describe('IncomeTaxDeclarationComponent', () => {
  let component: IncomeTaxDeclarationComponent;
  let fixture: ComponentFixture<IncomeTaxDeclarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeTaxDeclarationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeTaxDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
