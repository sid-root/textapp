import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgroupdialogComponent } from './addgroupdialog.component';

describe('AddgroupdialogComponent', () => {
  let component: AddgroupdialogComponent;
  let fixture: ComponentFixture<AddgroupdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgroupdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgroupdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
