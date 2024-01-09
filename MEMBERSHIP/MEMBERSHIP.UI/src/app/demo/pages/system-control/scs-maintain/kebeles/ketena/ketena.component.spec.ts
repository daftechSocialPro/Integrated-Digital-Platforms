import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KetenaComponent } from './ketena.component';

describe('KetenaComponent', () => {
  let component: KetenaComponent;
  let fixture: ComponentFixture<KetenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KetenaComponent]
    });
    fixture = TestBed.createComponent(KetenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
