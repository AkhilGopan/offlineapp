
/**
	* @initializing conig file and setting application
	* @constants accodingly
	**/

var config = require('../config/config.js');
var environment = config.environment();

exports.define = function () {
	var constants = {
		host: environment.url_domain,
		basePath: "./public/uploads/",
		supporting_uploads_type: "['PDF','GIF','JPEG','JPG','PNG','png']",
	};
	return constants;
}
exports.keys = function () {
	var constants = {
		cryptokey: "0e95d56c-3a0b-4833-9c7b-3236ebd96b42",
		//sessionkey: require('crypto').randomBytes(64).toString('hex'),
		sessionkey: "1s64ltYhK4sgN5s207WvgYqpa23I31qt",
		cipher_key: "e7G5Rhak792q",
	};
	return constants;
}

exports.messages = function () {
	var constants = {
		done: "Done. Task Finished!",
		actionnotcompleted: "Task Could not be Finished. Try again after sometime!",
		noSufficientData: "No enough data provided.",
		nouser: "No user found",
		anotherinstancerunning: "You have another instance of session running. Close this before you login to another",
		loginsuccessful: "You have succesfully logined.",
		invalidcredentials: "You provided invalid credentials",
		invalidtoken: "You provided invalid token",
		loggedout: "You have successfully logged out.",
		usercreationSuccess: "User created succesfully.",
		usercreationFailed: "Error adding user",
		userUpdationSuccess: "User Updated Successfully",
		unauthorized: "You are not authorized to do this operations",
		usermailexists: "The email already exists.",
		useralreadyexists: "An user already exists with this data.",
		userdelete: "User deleted Succesfully",
		invalidmail: "Invalid email",
		invalidPhone: "Invalid phone number",
		tokenupdated: "Your token has been updated",
		notrequestedchange: "It seems you haven't  requested a password change.",
		linkexpired: "This link has expired. Try requesting password change once more.",
		passwordchanged: "You have changed your password.",
		cannotchangepassword: "You can't change your password.You have already changed your password.",
		clearloggedsessions: "You have successfully logged out all sessions.",
		forgotmailsent: "Email has been sent the mail. Please reset using the link on mail",
		forgotmailsenterr: "Some error went in between",
	};
	return constants;
}

