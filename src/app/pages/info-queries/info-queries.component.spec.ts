import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoQueriesComponent } from './info-queries.component';

describe('InfoQueriesComponent', () => {
  let component: InfoQueriesComponent;
  let fixture: ComponentFixture<InfoQueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoQueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
