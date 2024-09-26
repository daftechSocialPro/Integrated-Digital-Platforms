import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunterDetailComponent } from './volunter-detail.component';

describe('VolunterDetailComponent', () => {
  let component: VolunterDetailComponent;
  let fixture: ComponentFixture<VolunterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunterDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
