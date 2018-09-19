import './body.html';
import { ReactiveDict } from 'meteor/reactive-dict';

import './templates/eits-list.js';
import './templates/the-eits.js';

import { EITs} from '../api/eits.js';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    this.state.set('theArray', []);
    Meteor.subscribe('eits');
});

Template.body.events({
    'click .edit' (event){
        var id = this._id;
        var eit = EITs.findOne({'_id':id});
        var form = document.querySelector("form.update-eit");
        form.first.value = eit.firstname;
        form.last.value = eit.lastname;
        form.dob.value = eit.dob;
        form.gender.value = eit.gender;
        form.id.value=eit._id;
        document.getElementById('new-eit').style.display='none';
        document.getElementById('update-eit').style.display='block';
    },
    'change .toggle-checked'(event, instance) {
      var getAll = instance.state.get('theArray')
      if (event.target.checked) {
          getAll.push(this._id)
          instance.state.set('theArray',getAll)
      } else {
          getAll.splice(getAll.indexOf(this._id), 1)
          instance.state.set('theArray',getAll)
      }
    },
    'click .delete' (event, instance) {
        var getAll = instance.state.get('theArray')
        getAll.forEach(function(id){
            Meteor.call('eits.remove', id);
        })
    },
});