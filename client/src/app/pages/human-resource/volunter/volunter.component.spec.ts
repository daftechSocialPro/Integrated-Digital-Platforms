import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunterComponent } from './volunter.component';

describe('VolunterComponent', () => {
  let component: VolunterComponent;
  let fixture: ComponentFixture<VolunterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
