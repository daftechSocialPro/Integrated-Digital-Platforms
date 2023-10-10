import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVolunterComponent } from './add-volunter.component';

describe('AddVolunterComponent', () => {
  let component: AddVolunterComponent;
  let fixture: ComponentFixture<AddVolunterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVolunterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVolunterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
