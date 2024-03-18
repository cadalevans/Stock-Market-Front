import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SicavComponent } from './sicav.component';

describe('SicavComponent', () => {
  let component: SicavComponent;
  let fixture: ComponentFixture<SicavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SicavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SicavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
