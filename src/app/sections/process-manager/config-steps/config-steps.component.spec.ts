import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigStepsComponent } from './config-steps.component';

describe('ConfigStepsComponent', () => {
  let component: ConfigStepsComponent;
  let fixture: ComponentFixture<ConfigStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
