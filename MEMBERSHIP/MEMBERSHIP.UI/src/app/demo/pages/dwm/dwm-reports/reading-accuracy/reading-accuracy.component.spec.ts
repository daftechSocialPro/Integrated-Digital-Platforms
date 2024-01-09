import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingAccuracyComponent } from './reading-accuracy.component';

describe('ReadingAccuracyComponent', () => {
  let component: ReadingAccuracyComponent;
  let fixture: ComponentFixture<ReadingAccuracyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadingAccuracyComponent]
    });
    fixture = TestBed.createComponent(ReadingAccuracyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
