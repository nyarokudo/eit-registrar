import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
 
import './the-eits.html';

Template.eit.helpers({
    isOwner() {
      return this.owner === Meteor.userId();
    },
});  

Template.body.events({
    'submit .new-eit'(event) {
      // Prevent default browser form submit
      event.preventDefault();

    
      // Get value from form element
      const target = event.target;
      const firstname = target.first.value;
      const lastname = target.last.value;
      const gender = target.gender.value;
      const dob = target.dob.value;
   
      // Insert a task into the collection
      Meteor.call('eits.insert', firstname, lastname, gender, dob);

      // Clear form
      target.reset();
    },

    'submit .update-eit'(event) {
        event.preventDefault();

        const target = event.target;
        const firstname = target.first.value;
        const lastname = target.last.value;
        const gender = target.gender.value;
        const dob = target.dob.value;
        const id = target.id.value;

        Meteor.call('eits.update', id, firstname, lastname, gender, dob)

        target.reset();
        document.getElementById('new-eit').style.display='block';
        document.getElementById('update-eit').style.display='none';
    }
});