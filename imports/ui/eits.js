import { Template } from 'meteor/templating';

import { EITs } from '../../api/eits.js';

import './eits.html';

Template.eits.helpers({
	eits:()=>{
		return EITs.find({}, {sort: { lastname: 1 } });
	},
});