import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VuComponent } from './vu.component';

describe('VuComponent', () => {
  let component: VuComponent;
  let fixture: ComponentFixture<VuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
