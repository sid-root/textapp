import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfolderdlgComponent } from './addfolderdlg.component';

describe('AddfolderdlgComponent', () => {
  let component: AddfolderdlgComponent;
  let fixture: ComponentFixture<AddfolderdlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfolderdlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfolderdlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
