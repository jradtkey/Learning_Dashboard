var controller = require('./../controllers/controllers.js');

module.exports = function(app) {

  app.post('/createUser', (req, res, next) => {
    controller.createUser(req, res);
  });

  app.post('/newUser', (req, res) => {
    controller.newUser(req, res);
  })

  app.post('/newInstructor', (req, res) => {
    controller.newInstructor(req, res);
  })

  app.post('/checkPassword', (req, res, next) => {
    controller.user(req,res);
  });

  app.post('/fetch_user_by_id', (req, res, next) => {
    controller.fetch_user_by_id(req,res);
  })

  app.post('/fetchStudentByID', (req, res, next) => {
    controller.fetchStudentByID(req, res);
  })

  app.post('/addStudent', (req, res) => {
    controller.addStudent(req, res);
  })

  app.post('/approveSkill', (req, res) => {
    controller.approveSkill(req, res);
  })

  app.post('/addSticker', (req, res) => {
    controller.addSticker(req, res);
  })

  app.get('/fetchUsers', controller.fetchUsers);
  app.get('/fetchUser', controller.fetchUser);
  app.get('/fetchStudents', controller.fetchStudents);
  app.get('/fetchStudent', controller.fetchStudent);

  app.post('/createStudent', (req,res,next) => {
    controller.createStudent(req,res);
  })


}
