import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigStepRolesComponent } from './config-step-roles.component';

describe('ConfigStepRolesComponent', () => {
  let component: ConfigStepRolesComponent;
  let fixture: ComponentFixture<ConfigStepRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigStepRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigStepRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
