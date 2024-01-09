import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssHomeComponent } from './css-home.component';

describe('CssHomeComponent', () => {
  let component: CssHomeComponent;
  let fixture: ComponentFixture<CssHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CssHomeComponent]
    });
    fixture = TestBed.createComponent(CssHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
