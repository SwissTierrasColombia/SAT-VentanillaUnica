import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateObjectEspecialComponent } from './update-object-especial.component';

describe('UpdateObjectEspecialComponent', () => {
  let component: UpdateObjectEspecialComponent;
  let fixture: ComponentFixture<UpdateObjectEspecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateObjectEspecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateObjectEspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
