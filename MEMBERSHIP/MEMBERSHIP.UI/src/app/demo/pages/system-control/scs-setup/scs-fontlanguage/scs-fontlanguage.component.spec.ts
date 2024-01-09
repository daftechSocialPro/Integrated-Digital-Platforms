import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsFontlanguageComponent } from './scs-fontlanguage.component';

describe('ScsFontlanguageComponent', () => {
  let component: ScsFontlanguageComponent;
  let fixture: ComponentFixture<ScsFontlanguageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsFontlanguageComponent]
    });
    fixture = TestBed.createComponent(ScsFontlanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
