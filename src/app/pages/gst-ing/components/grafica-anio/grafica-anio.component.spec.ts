import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaAnioComponent } from './grafica-anio.component';

describe('GraficaAnioComponent', () => {
  let component: GraficaAnioComponent;
  let fixture: ComponentFixture<GraficaAnioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaAnioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaAnioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
