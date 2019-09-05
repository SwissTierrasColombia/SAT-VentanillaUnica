import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroObjEspecialComponent } from './registro-obj-especial.component';

describe('RegistroObjEspecialComponent', () => {
  let component: RegistroObjEspecialComponent;
  let fixture: ComponentFixture<RegistroObjEspecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroObjEspecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroObjEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
