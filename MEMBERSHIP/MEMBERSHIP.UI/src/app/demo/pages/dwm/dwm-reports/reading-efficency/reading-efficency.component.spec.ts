import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingEfficencyComponent } from './reading-efficency.component';

describe('ReadingEfficencyComponent', () => {
  let component: ReadingEfficencyComponent;
  let fixture: ComponentFixture<ReadingEfficencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadingEfficencyComponent]
    });
    fixture = TestBed.createComponent(ReadingEfficencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
