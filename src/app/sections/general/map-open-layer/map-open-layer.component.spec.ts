import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOpenLayerComponent } from './map-open-layer.component';

describe('MapOpenLayerComponent', () => {
  let component: MapOpenLayerComponent;
  let fixture: ComponentFixture<MapOpenLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOpenLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOpenLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
