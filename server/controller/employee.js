/**
  * @author Akhil Gopan - akhil.gopan@techversantinfotech.com
  * @desc Employee Operation for the application
**/

var common = require('../helpers/common.js');
var keys = common.constants.keys()
var response = { status  : null, success : null, data : null }; // status provide conditions of api request, success states the resultant status of api(boolean), data return data from api
var sess = {}; // common session constant
const helpers = common.helpers;
const messages = common.constants.messages();

module.exports = function (app) {

//Models Required
var Employee = common.mongoose.model('Employee');

app.post('/api/v1/employeeLogin', function (req, res, next) {
   var PIN = req.body.minifpin

    Employee.findOne({ pin: PIN, active : 1 }, function (err, user) {
      if(err)
        return res.json(helpers.response(401,false,null,err))      
      if(user){
         req.session.employee = user
         return res.json(helpers.response(200,true,user,messages.loginsuccessful))      
      }
      else{
        return res.json(helpers.response(400,false,null,messages.nouser))      
      }
    })
})
/*
app.get('/api/forum',helpers.authenticateEmployee(), function (req, res, next) {

})*/


app.get('/api/v1/authenticateemployee',helpers.authenticateEmployee(), function (req, res, next) {
  var sess = req.session

  var emp = sess.employee;
      if (emp._id != null) {
          res.json(helpers.response(200,true,emp,0)) 
      }
      else{
          res.json(helpers.response(400,false,null,0)) 
      }

})

app.post('/api/v1/terminateempsession', function (req, res) {
      req.session.employee = {}
      var sess;
      sess = req.session;
      console.log(req.session)
      return res.json(helpers.response(401,false,sess,messages.loggedout))    
});
} // user module ENDS
