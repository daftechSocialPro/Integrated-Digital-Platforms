import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsBackupComponent } from './scs-backup.component';

describe('ScsBackupComponent', () => {
  let component: ScsBackupComponent;
  let fixture: ComponentFixture<ScsBackupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsBackupComponent]
    });
    fixture = TestBed.createComponent(ScsBackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
