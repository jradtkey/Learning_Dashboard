import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instructor-student-dashboard',
  templateUrl: './instructor-student-dashboard.component.html',
  styleUrls: ['./instructor-student-dashboard.component.css']
})
export class InstructorStudentDashboardComponent implements OnInit {

  current_student;

  constructor(private _route: ActivatedRoute, private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.fetchStudentByID();
  }

  fetchStudentByID(){
    console.log(this.service.studentID);
    this.service.fetchStudentByID(
      (res) => {
        this.current_student = res.json()['student'];
      }
    )
  }

  approveSkill(data){
    this.service.approveSkill(data, this.service.studentID,
      (res) => {
        console.log("callback", res.json()['student']);
        this.fetchStudentByID();
      }
    )
  }

}
