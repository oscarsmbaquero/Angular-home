import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GstIngComponent } from './gst-ing.component';

describe('GstIngComponent', () => {
  let component: GstIngComponent;
  let fixture: ComponentFixture<GstIngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GstIngComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GstIngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
