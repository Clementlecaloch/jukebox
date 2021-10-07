import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDataComponent } from './playlist-data.component';

describe('PlaylistDataComponent', () => {
  let component: PlaylistDataComponent;
  let fixture: ComponentFixture<PlaylistDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
