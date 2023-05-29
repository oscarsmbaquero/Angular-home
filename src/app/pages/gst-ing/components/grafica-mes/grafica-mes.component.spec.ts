import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaMesComponent } from './grafica-mes.component';

describe('GraficaMesComponent', () => {
  let component: GraficaMesComponent;
  let fixture: ComponentFixture<GraficaMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficaMesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
