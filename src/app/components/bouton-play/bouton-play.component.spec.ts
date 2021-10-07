import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutonPlayComponent } from './bouton-play.component';

describe('BoutonPlayComponent', () => {
  let component: BoutonPlayComponent;
  let fixture: ComponentFixture<BoutonPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoutonPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoutonPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
