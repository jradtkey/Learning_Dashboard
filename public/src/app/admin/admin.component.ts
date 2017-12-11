import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  user: User = new User("","","","","");

  users = [];
  students = [];
  show_users = false;
  show_students = false;
  show_instructors = false;
  modal = false;
  promise;
  stickers;
  sticker_urls = []

  constructor(private _route: ActivatedRoute, private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.fetchUsers();
    this.fetchStudents();
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

  onSubmit(data){
    console.log(data.value);
    // this.instructor = data.value;
    this.user.first_name = data.value.first_name;
    this.user.last_name = data.value.last_name;
    this.user.email = data.value.email;
    this.user.phone_number = data.value.phone_number;
    this.user.password = "ppppppp"
    console.log("NEW instructor:", this.user);

    this.service.newInstructor(this.user,
      (res) => {
        console.log("saved instructor", res.json()['user']);
        this.modal = false;
        this.fetchUsers();
      }
    )

  }

  showUsers(){
    if(this.show_users == false) {
      this.show_users = true;
    }
    else if (this.show_users == true){
      this.show_users = false;
    }
  }

  showStudents(){
    if(this.show_students == false) {
      this.show_students = true;
    }
    else if (this.show_students == true){
      this.show_students = false;
    }
  }

  showInstructors(){
    if(this.show_instructors == false) {
      this.show_instructors = true;
    }
    else if (this.show_instructors == true){
      this.show_instructors = false;
    }
  }

  // showStickers(){
  //   // this.promise = this.service.showStickers();
  //   this.service.showStickers().subscribe(
  //     data => {
  //       this.stickers = data;
  //       console.log("stickers", this.stickers)
  //       for(var i = 0; i < this.stickers.data.length; i++){
  //         this.sticker_urls.push(this.stickers.data[i].featured_gif.images.original.url)
  //       }
  //       console.log(this.sticker_urls)
  //     },
  //     error => {
  //       console.log("error")
  //     },
  //     () => {}
  //   );
  //
  // }
  //
  // saveUrl(data){
  //   console.log(data)
  // }

  addInstructor(){
    this.modal = true;
  }

  close(){
    this.modal = false;
  }

}
