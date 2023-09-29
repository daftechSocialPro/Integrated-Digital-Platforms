import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignationLetterComponent } from './resignation-letter.component';

describe('ResignationLetterComponent', () => {
  let component: ResignationLetterComponent;
  let fixture: ComponentFixture<ResignationLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResignationLetterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResignationLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
