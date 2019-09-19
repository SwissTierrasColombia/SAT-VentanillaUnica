import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProcedureComponent } from './manage-procedure.component';

describe('ManageProcedureComponent', () => {
  let component: ManageProcedureComponent;
  let fixture: ComponentFixture<ManageProcedureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProcedureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
