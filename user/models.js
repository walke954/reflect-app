const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const {entrySchema} = require('../entry/models');

const userSchema = mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	yearCreated: {type: Number, required: true},
	monthCreated: {type: Number, required: true},
	entries: [entrySchema]
});

userSchema.methods.serialize = function(){
	return {
		username: this.username,
		date: new Date()
	};
}

userSchema.methods.getEntries = function(){
	return {
		entries: this.entries
	};
}

userSchema.methods.accountBasics = function(){
	return{
		id: this._id,
		username: this.username,
		yearCreated: this.yearCreated,
		monthCreated: this.monthCreated
	}
}

userSchema.methods.passwordValidate = function(password){
	return bcryptjs.compare(password, this.password);
}

userSchema.statics.hashPassword = function(password){
	return bcryptjs.hash(password, 12);
}

const User = mongoose.model('User', userSchema);

module.exports = {User};