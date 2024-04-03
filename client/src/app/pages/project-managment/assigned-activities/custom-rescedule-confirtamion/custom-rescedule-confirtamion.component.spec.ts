import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomResceduleConfirtamionComponent } from './custom-rescedule-confirtamion.component';

describe('CustomResceduleConfirtamionComponent', () => {
  let component: CustomResceduleConfirtamionComponent;
  let fixture: ComponentFixture<CustomResceduleConfirtamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomResceduleConfirtamionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomResceduleConfirtamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
