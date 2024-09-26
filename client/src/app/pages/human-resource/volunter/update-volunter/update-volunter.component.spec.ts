import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVolunterComponent } from './update-volunter.component';

describe('UpdateVolunterComponent', () => {
  let component: UpdateVolunterComponent;
  let fixture: ComponentFixture<UpdateVolunterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVolunterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateVolunterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
