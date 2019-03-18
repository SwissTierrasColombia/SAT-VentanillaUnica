import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionalParcelInfoComponent } from './institutional-parcel-info.component';

describe('InstitutionalParcelInfoComponent', () => {
  let component: InstitutionalParcelInfoComponent;
  let fixture: ComponentFixture<InstitutionalParcelInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionalParcelInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionalParcelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
