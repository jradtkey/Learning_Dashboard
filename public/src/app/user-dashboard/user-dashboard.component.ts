import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Student } from '../student';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  users = [];
  userID;
  modal = false;
  current_user = [];
  user;
  students = [];
  student: Student = new Student("","","","");
  user_students = [];
  instructor_ids = [];
  instructors = [];


  constructor(private _route: ActivatedRoute, private service: ServiceService, private router: Router) { }

  ngOnInit() {

    this.userID = this.service.userID;
    this.fetch_user_by_id();
    this.fetchStudents();
  }


  addStudent(){
    this.modal = true;
  }

  close(){
    this.modal = false;
  }

  fetchStudents(){
    this.service.fetchStudents(
      (res) => {
        this.students = res.json()['students'];

        //create array of students of current user
        for(var i = 0; i < this.students.length; i++){
          if(this.students[i]._user == this.userID){
            this.user_students.push(this.students[i]);
          }
        }

        //create array of instructors of current user
        for(var i = 0; i < this.user_students.length; i++){
          for(var j = 0; j < this.user_students[i].instructors.length; j++){
            if(!this.instructor_ids.includes(this.user_students[i].instructors[j])){
              this.instructor_ids.push(this.user_students[i].instructors[j])
            }
          }
        }
        // console.log(this.instructor_ids)
        if(this.instructor_ids.length > 0){
          this.fetchUsers();
        }
      }
    )
  }


  // currentUserStudents(){
  //   console.log("ARE YOU THERE??", this.students.length);
  //
  // }

  fetchUsers(){
    console.log("CHECKING IF RAN")
    this.service.fetchUsers(
      (res) => {
        this.users = res.json()['users'];

        //find instructor info of current user
        for(var i = 0; i < this.users.length; i ++){
          for(var j = 0; j < this.instructor_ids.length; j++){
            // console.log(this.users[i]._id)
            // console.log(this.instructor_ids[j])
            if(this.users[i]._id == this.instructor_ids[j]){
              this.instructors.push(this.users[i])
            }
          }
        }
      }
    )
  }

  fetch_user_by_id(){
    this.service.fetch_user_by_id(
      (res) => {
        this.current_user = res.json()['user'];
        console.log("Existing USER:", this.current_user[0])
        this.user = this.current_user[0];
      }
    )
  }


  onSubmit(data){
    this.student.first_name = data.value.first_name;
    this.student.last_name = data.value.last_name;
    this.student.birthdate = data.value.birthdate;
    this.student.user_id = this.userID;
    console.log("NEW STUDENT:", this.student);
    this.service.createStudent(this.student,
      (res) => {
        this.service.studentID = res.json()['student']._id;
      }
    );
    this.user_students = [];
    this.fetch_user_by_id();
    this.fetchStudents();
    this.modal = false;
    // this.router.navigate(['user_dashboard']);
  }

  showStudent(data){
    console.log(data);
    this.service.storeStudentID(data);
    this.router.navigate(['studentDashboard']);
  }

}
