import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  current_user;
  user;
  current_student;
  stickers;
  sticker_urls = [];
  modal = false;
  skill_id;
  progress;

  constructor(private _route: ActivatedRoute, private service: ServiceService, private router: Router) { }

  ngOnInit() {
    if(this.service.studentID === undefined){
      this.fetchStudent();
    }
    else if (this.service.studentID !== undefined){
      this.fetchStudentByID();
    }
  }

  fetchStudentByID(){
    this.service.fetchStudentByID(
      (res) => {
        this.current_student = res.json()['student'];
        this.countProgress();
      }
    )
  }

  fetchStudent(){
    this.service.fetchStudent(
      (res) => {
        this.current_student = res.json()['student'];
        this.countProgress();
      }
    )
  }

  fetch_user_by_id(){
    this.service.fetch_user_by_id(
      (res) => {
        this.current_user = res.json()['user'];
        this.user = this.current_user[0];
      }
    )
  }

  addSticker(data){
    this.modal = false;
    this.service.addSticker(data, this.skill_id,
      (res) => {
        console.log("callback", res.json()['student']);
        this.fetchStudentByID();
      }
    )
    this.sticker_urls = [];
  }

  showStickers(data){
    this.service.showStickers().subscribe(
      data => {
        this.stickers = data;
        console.log("stickers", this.stickers)
        for(var i = 0; i < this.stickers.data.length; i++){
          if(this.stickers.data[i].featured_gif.images.original.url != "https://media3.giphy.com/media/l378tlrm4W7Fzg8aA/giphy.gif"){
            this.sticker_urls.push(this.stickers.data[i].featured_gif.images.original.url)
          }
        }
      },
      error => {
        console.log("error")
      },
      () => {}
    )
    this.modal = true
    this.skill_id = data;
  }

  close(){
    this.skill_id = "";
    this.modal = false;
    this.sticker_urls = [];
  }

  countProgress() {
    var total = 0;
    var progress = 0;
    for (var i = 0; i < this.current_student[0].levels.length; i++) {
      for(var j = 0; j < this.current_student[0].levels[i].skills.length; j++) {
        total ++;
        if(this.current_student[0].levels[i].skills[j].pass == 2){
          progress ++;
        }
      }
    }
    progress *= 100;
    this.progress = Math.floor(progress/total);
    if(this.progress == Infinity){
      this.progress = 0;
    }
  }

}
