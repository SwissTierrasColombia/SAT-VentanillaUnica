import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoreComponent } from './rore.component';

describe('RoreComponent', () => {
  let component: RoreComponent;
  let fixture: ComponentFixture<RoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
