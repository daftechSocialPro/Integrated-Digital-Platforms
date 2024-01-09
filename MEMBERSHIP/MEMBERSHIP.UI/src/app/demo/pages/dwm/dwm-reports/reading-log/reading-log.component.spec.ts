import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingLogComponent } from './reading-log.component';

describe('ReadingLogComponent', () => {
  let component: ReadingLogComponent;
  let fixture: ComponentFixture<ReadingLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadingLogComponent]
    });
    fixture = TestBed.createComponent(ReadingLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
