
/**
  * @desc database setup details are defined
  * @param string connection string for MongoDB
**/

var mongoose = require('mongoose');

const MGHOST = 'localhost';
const MGUSER = '';
const MGPWWD = '';
const MGPORT = '27017';
const MGDCMT = 'meanapp';
const MGSTRING = 'mongodb://'+MGHOST+'/'+MGDCMT+''

exports.dbconfig = function () {
	var configuration = {
		connectionstring: process.env.DATABASE_URL || MGSTRING,
		collection: {
			session_collection : "lanappmoments"
		}
	};
	return configuration;
};
