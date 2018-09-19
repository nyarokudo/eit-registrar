import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const EITs = new Mongo.Collection('eit');

if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish('eit', function eitPublication() {
		return EITs.find();
	})
}

Meteor.methods({
	'eit.insert'(firstname, lastname, gender, dob) {
		check(firstname, String);
		check(lastname, String);
		check(gender, String);
		check(dob, String);

		//Make sure the user is logged in before inserting a task
		if (! Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}

		EITs,insert({
			firstname: firstname,
			lastname: lastname,
			gender: gender,
			dob: dob,
			owner: Meteor.userId(),
		});
	},
	'eit.remove' (eitID) {
		check(eitID, String);

		EITs.remove(eitId);
	},
	'eit.update'(eitsID, firstname, lastname, gender, dob) {
		EITs.update(eitsID, { $set: {firstname:firstname, lastname:lastname, gender:gender, dob:dob} });
	},
});