import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccancyPostComponent } from './vaccancy-post.component';

describe('VaccancyPostComponent', () => {
  let component: VaccancyPostComponent;
  let fixture: ComponentFixture<VaccancyPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccancyPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaccancyPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
