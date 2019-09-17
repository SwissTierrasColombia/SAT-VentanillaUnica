import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProcedureComponent } from './search-procedure.component';

describe('SearchProcedureComponent', () => {
  let component: SearchProcedureComponent;
  let fixture: ComponentFixture<SearchProcedureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProcedureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
