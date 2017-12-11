var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var User = mongoose.model('User');
var Student = mongoose.model('Student');

var user_id;
var student_id;

module.exports = {

  newUser: function (req, res) {
    var password = passwordHash.generate(req.body.password);
    var user = new User({
      credential: 'user',
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      password: password,
      created_at: Date.now()
    })


    user.save(function (err) {
      if (err) {
        console.log(err);
          res.json({err:"error"});
      }
      else {
        res.json({'user': user});
      }
    })

  },

  newInstructor: function (req, res) {

    console.log(req.body);
    var password = passwordHash.generate(req.body.password);
    var user = new User({
      credential: 'instructor',
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      password: password,
      created_at: Date.now(),
      lessons: []
    })


    user.save(function (err) {
      if (err) {
        console.log(err);
          res.json({err:"error"});
      }
      else {
        res.json({'user': user});
      }
    })

  },

  addStudent: function (req, res) {
    console.log(req.body);
    Student.find({_id:req.body.student_id}, function(err, student){
      student[0].instructors.push(req.body.instructor_id);
      student[0].save(function (err) {
        if (err) {
          res.json({err:err});
        }
        else {
          User.find({_id:req.body.instructor_id}, function(err, instructor){
            instructor[0].students.push(req.body.student_id);
            console.log(instructor[0]);
            instructor[0].save(function (err) {
              if(err){
                console.log("NOT SAVED");
                res.json({err:err});
              }
              else {
                console.log("SAVED");
                res.json({'instructor': instructor[0]});
              }
            })
          })
        }
      })
      console.log("FETCH Student - inside controller", student[0]);
    })


  },

  approveSkill: function (req, res) {
    console.log("inside controller", req.body);
    Student.find({_id:req.body.student_id}, function(err, student){
      console.log(student[0].levels);
      for(let level of student[0].levels){
        for(let skill of level.skills){
            console.log(skill);
            if(skill._id == req.body.skill_id){
              skill.pass = 1;
            }
        }
      }

      student[0].save(function (err) {
        if (err) {
          res.json({err:err});
        }
        else {
          console.log("SAVED");
          res.json({'student': student[0]});
        }
      })
      console.log("FETCH Student - inside controller", student[0]);
    })


  },

  addSticker: function (req, res) {
    console.log("inside controller", req.body);
    Student.find({_id:req.body.student_id}, function(err, student){
      console.log(student[0].levels);
      for(let level of student[0].levels){
        for(let skill of level.skills){
          if(skill._id == req.body.skill_id){
            skill.pass = 2;
            skill.sticker = req.body.url;
          }
        }
      }
      student[0].save(function (err) {
        if (err) {
          res.json({err:err});
        }
        else {
          console.log("SAVED");
          res.json({'student': student[0]});
        }
      })
      console.log("FETCH Student - inside controller", student[0]);
    })


  },



  fetchUsers: function (req, res) {
    User.find({}, function(err, users){
      res.json({'users': users});
    })
  },

  fetchUser: function (req, res) {
    console.log("NEW USER ID:", user_id);
    User.find({_id:user_id}, function(err, user){
      res.json({'user': user});
      console.log("FETCH USER - inside controller", user);
    })
  },

  fetchStudent: function (req, res) {

    Student.find({_id:student_id}, function(err, student){
      res.json({'student': student});

    })
  },

  fetch_user_by_id: function (req, res) {
    User.find({_id:req.body.user_id}, function(err, user){
      res.json({'user': user});
      user_id = req.body.user_id;
    })
  },

  fetchStudentByID: function (req, res) {
    Student.find({_id:req.body.student_id}, function(err, student){
      res.json({'student': student});
    })
  },

  fetchStudents: function (req, res) {
    Student.find({}, function(err, students){
      if (err) {
        console.log(err);
        res.json({err:err})
      }
      else {
        res.json({'students': students});
      }
    })
  },

  user: function(req, res) {
    var password = passwordHash.generate(req.body.password)
    console.log(req.body);
    User.find({email: req.body.email}, function(err, user) {
      console.log(user);
      if (user.length > 0) {
        if (passwordHash.verify(req.body.password, user[0].password)) {
          console.log("user exists - correct password");
          res.json({'user': user});
        }
        else {
          console.log("user exists - incorrect password");
          res.json({'user': []});
        }
      }
      else {
        console.log("user doesn't exist");
        res.json({'user': []});
      }
    })
  },

  createStudent: function(req,res) {


    User.findOne({_id: user_id}, function (err, post) {

      var student = new Student ({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthdate: req.body.birthdate,
        lessons: [],
        instructors: [],
        //
        // LEVELS
        //

        levels: [
          {

            name: "Bronze 1",

            skills: [

              {
                skill: "Bobs with bubbles",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Underwater for 3 seconds",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Front float with help",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Back float with help",
                pass: 0,
                sticker: ""
              }
            ],

            pass: false
          },

          {

            name: "Bronze 2",

            skills: [

              {
                skill: "Back float independently",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Back float, roll to tummy",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Front float independently",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Kicks with drive",
                pass: 0,
                sticker: ""
              }
            ],

            pass: false
          },

          {

            name: "Bronze 3",

            skills: [

              {
                skill: "Kick, roll to back",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Arms and kicks with drive",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Arms with kicks, then roll",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Arms with kicks then roll 3x",
                pass: 0,
                sticker: ""
              }
            ],

            pass: false
          },

          {

            name: "Safety",

            skills: [

              {
                skill: "Climb out",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Pick up toy from bottom",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Fall in to istructor",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Fall in and return to wall",
                pass: 0,
                sticker: ""
              }
            ],

            pass: false
          },

          {

            name: "Silver 1",

            skills: [

              {
                skill: "Stationary rhythmic breathing",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Assisted rhythmic breathing",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Independent rhythmic breathing",
                pass: 0,
                sticker: ""
              },

              {
                skill: "15 yards with rhythmic breathing",
                pass: 0,
                sticker: ""
              }
            ],

            pass: false
          },

          {

            name: "Silver 2",

            skills: [

              {
                skill: "Back kicks with arms to the side",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Back kicks in a streamline",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Arms with kick",
                pass: 0,
                sticker: ""
              },

              {
                skill: "15 yards backstroke",
                pass: 0,
                sticker: ""
              }
            ],

            pass: false
          },

          {

            name: "Silver 3",

            skills: [

              {
                skill: "25 yards of freestyle",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Breaststroke kick",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Butterfly kick",
                pass: 0,
                sticker: ""
              },

              {
                skill: "25 yards of backstroke",
                pass: 0,
                sticker: ""
              }
            ],

            pass: false
          },

          {

            name: "Safety",

            skills: [

              {
                skill: "Fall in, back float",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Tread water for 10 seconds",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Fall in, back float, return to wall",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Fall in, tread for 30 secs, return to wall",
                pass: 0,
                sticker: ""
              }
            ],

            pass: false
          },

          {

            name: "Freestyle",

            skills: [

              {
                skill: "Body rotation drill",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Proper pull and hand placement",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Efficient breathing",
                pass: 0,
                sticker: ""
              },

              {
                skill: "50 yards of freestyle",
                pass: 0,
                sticker: ""
              }
            ],

            pass: false
          },

          {

            name: "Backstroke",

            skills: [

              {
                skill: "Body rotation drill",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Thumb out, pinky in",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Extended arm pull",
                pass: 0,
                sticker: ""
              },

              {
                skill: "50 yards of backstroke",
                pass: 0,
                sticker: ""
              }
            ],

            pass: false
          },

          {

            name: "Breaststroke",

            skills: [

              {
                skill: "I, Y, scoop, shoot",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Separation drill",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Up, around, squeeze",
                pass: 0,
                sticker: ""
              },

              {
                skill: "50 yards breaststroke with pull-down",
                pass: 0,
                sticker: ""
              }
            ],

            pass: false
          },

          {

            name: "Butterfly",

            skills: [

              {
                skill: "Reach, pull, swing",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Body dolphin",
                pass: 0,
                sticker: ""
              },

              {
                skill: "Butterfly drill",
                pass: 0,
                sticker: ""
              },

              {
                skill: "25 yards of butterfly",
                pass: 0,
                sticker: ""
              }
            ],

            pass: false
          }



        ],


        created_at: Date.now()
      })

      console.log("STUDENT ID from OBJECT:", student._id);

      student._user = req.body.user_id;
      post.students.push(student._id);
      student_id = student._id;
      console.log("STUDENT ID from controller:", student_id);

      student.save(function (err) {
        if (err) {
          res.json({err:err});
        }
        else {
          post.save(function (err) {
            if(err){
              res.json({err:err});
            }
            else {
              res.json({'student': student});
            }
          })
        }
      })


    })

  }

}
