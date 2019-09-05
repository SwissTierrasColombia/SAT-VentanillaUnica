import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicParcelInfoComponent } from './basic-parcel-info.component';

describe('BasicParcelInfoComponent', () => {
  let component: BasicParcelInfoComponent;
  let fixture: ComponentFixture<BasicParcelInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicParcelInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicParcelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
