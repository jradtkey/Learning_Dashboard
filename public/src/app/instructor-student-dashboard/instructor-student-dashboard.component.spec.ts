import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorStudentDashboardComponent } from './instructor-student-dashboard.component';

describe('InstructorStudentDashboardComponent', () => {
  let component: InstructorStudentDashboardComponent;
  let fixture: ComponentFixture<InstructorStudentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorStudentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorStudentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
