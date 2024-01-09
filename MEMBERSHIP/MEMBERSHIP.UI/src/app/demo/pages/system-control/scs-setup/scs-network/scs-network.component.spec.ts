import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScsNetworkComponent } from './scs-network.component';

describe('ScsNetworkComponent', () => {
  let component: ScsNetworkComponent;
  let fixture: ComponentFixture<ScsNetworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScsNetworkComponent]
    });
    fixture = TestBed.createComponent(ScsNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
