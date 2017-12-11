import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css']
})
export class LoginRegistrationComponent implements OnInit {

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  user: User = new User("","","","","");
  users = [];
  userID;

  userExists = false;
  registerAccount = false;
  credentials = true;

  constructor(private _route: ActivatedRoute, private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.fetchUsers();
  }

  checkPassword(password, email){
    this.service.checkPassword(password, email,
    (data) => {
      if(data.json()['user'].length == 0){
        this.credentials = false;
        this.router.navigate(['']);
      }
      else{
        this.userID = data.json()['user'][0]._id;
        this.service.storeID(this.userID);
        this.credentials = true;
        if(data.json()['user'][0].credential === "admin"){
          this.router.navigate(['adminDashboard'])
        }
        else if (data.json()['user'][0].credential === "user") {
          this.router.navigate(['user_dashboard']);
        }
        else if (data.json()['user'][0].credential === "instructor") {
          console.log("instructor")
          this.router.navigate(['instructorDashboard']);
        }
      }
    });
  }

  onSubmit(data){
    this.userExists = false;
    for(let email of this.users){
      if(data.value.email == email.email){
        this.userExists = true;
      }
    }

    if(this.userExists == false){
      this.user.first_name = data.value.first_name;
      this.user.last_name = data.value.last_name;
      this.user.email = data.value.email;
      this.user.phone_number = data.value.phone_number;
      this.user.password = data.value.password;
      console.log("creating user:", this.user);
      // this.service.createUser(this.user);


      this.service.newUser(this.user,
        (res) => {
          this.service.userID = res.json()['user']._id;
          console.log("NEW USER ID IN SERVICE:", this.service.userID);
          this.router.navigate(['user_dashboard']);
        }
      )




    }

  }

  register(){
    if(this.registerAccount == false){
      this.registerAccount = true;
    }
    else if(this.registerAccount == true){
      this.registerAccount = false;
    }
  }

  fetchUsers(){
    this.service.fetchUsers(
      (res) => {
        this.users = res.json()['users'];
      }
    )
  }

}
