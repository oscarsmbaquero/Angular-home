import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaTipoComponent } from './grafica-tipo.component';

describe('GraficaTipoComponent', () => {
  let component: GraficaTipoComponent;
  let fixture: ComponentFixture<GraficaTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaTipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
