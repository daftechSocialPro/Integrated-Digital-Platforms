import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuaranteeLetterComponent } from './guarantee-letter.component';

describe('GuaranteeLetterComponent', () => {
  let component: GuaranteeLetterComponent;
  let fixture: ComponentFixture<GuaranteeLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuaranteeLetterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuaranteeLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
