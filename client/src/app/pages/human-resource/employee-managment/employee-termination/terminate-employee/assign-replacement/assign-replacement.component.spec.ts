import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignReplacementComponent } from './assign-replacement.component';

describe('AssignReplacementComponent', () => {
  let component: AssignReplacementComponent;
  let fixture: ComponentFixture<AssignReplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignReplacementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignReplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
