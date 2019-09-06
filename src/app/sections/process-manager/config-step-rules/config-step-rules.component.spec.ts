import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigStepRulesComponent } from './config-step-rules.component';

describe('ConfigStepRulesComponent', () => {
  let component: ConfigStepRulesComponent;
  let fixture: ComponentFixture<ConfigStepRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigStepRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigStepRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
