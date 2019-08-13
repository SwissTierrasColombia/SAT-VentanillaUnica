import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBpmComponent } from './generate-bpm.component';

describe('GenerateBpmComponent', () => {
  let component: GenerateBpmComponent;
  let fixture: ComponentFixture<GenerateBpmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateBpmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateBpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
