import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs";
import { User } from './user';
import { Student } from './student';
import { Instructor } from './instructor';

@Injectable()
export class ServiceService {

  private user: User[]=[];
  private student: Student[]=[];
  private instructor: Instructor[]=[];

  userID;
  studentID;


  constructor(private _http: Http) { }


  newUser(user:User, callback){
    return this._http.post('/newUser', user).subscribe(
      (res) => {
        callback(res);
      }
    );
  }

  newInstructor(user:User, callback){
    console.log(user);
    return this._http.post('/newInstructor', user).subscribe(
      (res) => {
        callback(res);
      }
    );
  }

  fetchUsers(callback){
    this._http.get('/fetchUsers').subscribe(data => {
      callback(data);
    })
  }

  fetchStudents(callback){
    this._http.get('/fetchStudents').subscribe(data => {
      callback(data);
    })
  }

  fetchUser(callback){
    this._http.get('/fetchUser').subscribe(data => {
      callback(data);
    })
  }

  storeStudentID(data){
    console.log("SERVICE", data);
    this.studentID = data;
    console.log("STORED:", this.studentID);
  }

  fetch_user_by_id(callback){
    var user = {user_id: this.userID}
    this._http.post('/fetch_user_by_id', user).subscribe(data => {callback(data)});
  }

  fetchStudentByID(callback){
    var student = {student_id: this.studentID};
    console.log("service student id:", this.studentID);
    this._http.post('/fetchStudentByID', student).subscribe(data => {callback(data)});
  }

  fetchStudent(callback){
    console.log("service - new student")
    this._http.get('/fetchStudent').subscribe(data => {
      callback(data);
    })
  }

  checkPassword(password, email, callback){
    var x = {password:password, email:email}
    this._http.post('/checkPassword', x).subscribe(data => {callback(data)});
  }

  storeID(data){
    this.userID = data;
  }

  createStudent(student:Student, callback){
    return this._http.post('/createStudent', student).subscribe(
      (res) => {
        callback => (res);
      }
    );
  }

  addStudent(data, callback){

    var id = {student_id: data, instructor_id: this.userID}
    return this._http.post('/addStudent', id).subscribe(
      (res) => {
        callback(res);
      }
    );
  }

  approveSkill(skill_id, student_id, callback){
    var ids = {skill_id: skill_id, student_id: student_id, instructor_id: this.userID}

    console.log("service", ids)
    return this._http.post('/approveSkill', ids).subscribe(
      (res) => {
        callback(res);
      }
    );
  }

  addSticker(url, skill_id, callback){
    var ids = {url: url, skill_id: skill_id, student_id: this.studentID}

    console.log("service", ids)
    return this._http.post('/addSticker', ids).subscribe(
      (res) => {
        callback(res);
      }
    );
  }

  showStickers(){
    return this._http.get('https://api.giphy.com/v1/stickers/packs/3138/children?api_key=HcLX5PS0Cy17SBt2gRT40MeHls5rZBw9').map( data => data.json())

  }


}
