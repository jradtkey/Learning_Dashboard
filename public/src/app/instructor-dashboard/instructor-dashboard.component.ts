import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent implements OnInit {

  modalAdd = false;
  modalRemove = false;
  students = [];
  userID;
  users;
  user_students = [];
  selectStudent = false;
  show;
  instructor;
  current_instructor;

  constructor(private _route: ActivatedRoute, private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.fetchStudents();
    this.fetch_user_by_id();
    this.fetchUsers();
    this.userID = this.service.userID;
  }

  fetchUsers(){
    this.service.fetchUsers(
      (res) => {
        this.users = res.json()['users'];
      }
    )
  }

  fetchStudents(){
    this.service.fetchStudents(
      (res) => {
        this.students = res.json()['students'];
      }
    )
  }

  fetch_user_by_id(){
    this.service.fetch_user_by_id(
      (res) => {
        this.current_instructor = res.json()['user'];
        console.log("Existing USER:", this.current_instructor[0])
        this.instructor = this.current_instructor[0];
      }
    )
  }

  add_Student(data){
    if(data == "Select Student"){
      console.log("please select student")
      this.selectStudent = true;
    }
    else {
      console.log(data)
      this.service.addStudent(data,
        (res) => {
          console.log("INSIDE COMP")
          console.log(res.json()['instructor']);
          this.fetch_user_by_id();
          this.fetchUsers();
          this.fetchStudents();
          this.modalAdd = false;
          console.log(this.students)
        }
      );

    }
  }

  viewStudent(data){
    console.log(this.instructor);
    this.service.studentID = data;
    this.router.navigate(['instructorStudentDashboard']);
  }

  addStudentModal(){
    this.modalAdd = true;
  }

  closeAdd(){
    this.modalAdd = false;
  }

  removeStudentModal(){
    this.modalRemove = true;
  }

  closeRemove(){
    this.modalRemove = false;
  }

}
