import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigProcessComponent } from './config-process.component';

describe('ConfigProcessComponent', () => {
  let component: ConfigProcessComponent;
  let fixture: ComponentFixture<ConfigProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
