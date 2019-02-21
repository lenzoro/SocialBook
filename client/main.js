import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

Template.profiles.helpers({//template helpers put data into the template
	profAll(){
		return userDB.find({});
	}
});

Template.profiles.events({//template events define and customize user interactions(events) within the template
	'click .js-Interested'(event, instance) {
 		console.log("You clicked Interested");
 		var profID = this._id;
 		userDB.update({_id:profID}, {$set:{'Interested':Interested+1}});
  	},
  	'click .js-Uninterested'(event, instance) {
  		console.log("You clicked Uninterested");
  	},
  	'click .js-delete'(event,instance) {
  		var profID = this._id;
  		$("#" + profID).fadeOut("slow","swing",function(){
  			userDB.remove({_id:this._id}); 	
  		});
  	}
});

Template.addUser.events({
	'click .js-save'(event, instance) {
		var fname = $('#exampleModal input[name="firstName"]').val()
		var lname = $('#exampleModal input[name="lastName"]').val()
		var img = $('#exampleModal input[name="Image"]').val()
		if(img ==""){
			img="headshot.jpg"
		}
		console.log("The name is",fname,lname);
		$('#exampleModal input[name="firstName"]').val('')
		$('#exampleModal input[name="lastName"]').val('')
		$('#exampleModal input[name="Image"]').val('')
		$('#exampleModal').modal('hide');
		userDB.insert({'firstName':fname,'lastName':lname, 'Image':img});
  		
  },
}); 