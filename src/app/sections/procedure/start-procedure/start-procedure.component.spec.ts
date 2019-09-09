import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartProcedureComponent } from './start-procedure.component';

describe('StartProcedureComponent', () => {
  let component: StartProcedureComponent;
  let fixture: ComponentFixture<StartProcedureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartProcedureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
