import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegistrationComponent} from './login-registration/login-registration.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { InstructorStudentDashboardComponent } from './instructor-student-dashboard/instructor-student-dashboard.component';




const routes: Routes = [

  // {
  //   path : '/',
  //   redirectTo: '',
  // },

  {
    path : '',
    component: LoginRegistrationComponent,
  },

  {
    path: 'user_dashboard',
    component: UserDashboardComponent
  },

  {
    path: 'studentDashboard',
    component: StudentDashboardComponent,
  },

  {
    path: 'adminDashboard',
    component: AdminComponent,
  },

  {
    path: 'instructorDashboard',
    component: InstructorDashboardComponent,
  },

  {
    path: 'instructorStudentDashboard',
    component: InstructorStudentDashboardComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
