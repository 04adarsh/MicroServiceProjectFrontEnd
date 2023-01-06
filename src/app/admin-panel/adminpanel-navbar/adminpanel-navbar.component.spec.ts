import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanelNavbarComponent } from './adminpanel-navbar.component';

describe('AdminpanelNavbarComponent', () => {
  let component: AdminpanelNavbarComponent;
  let fixture: ComponentFixture<AdminpanelNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpanelNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpanelNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
