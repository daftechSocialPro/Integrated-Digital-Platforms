import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsMonthsComponent } from './scs-months.component';

describe('ScsMonthsComponent', () => {
  let component: ScsMonthsComponent;
  let fixture: ComponentFixture<ScsMonthsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsMonthsComponent]
    });
    fixture = TestBed.createComponent(ScsMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
