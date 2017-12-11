import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { ServiceService } from './service.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { InstructorStudentDashboardComponent } from './instructor-student-dashboard/instructor-student-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginRegistrationComponent,
    UserDashboardComponent,
    StudentDashboardComponent,
    AdminComponent,
    InstructorDashboardComponent,
    InstructorStudentDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TextMaskModule,
    HttpModule,
    FormsModule,
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
