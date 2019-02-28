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
 		var numlikes = userDB.findOne({_id: profID}).Interested;
 		if(!numlikes){
 			numlikes = 0;
 		}
 		numlikes= numlikes+1;
 		userDB.update({_id:profID}, {$set:{'Interested':numlikes}});
  	},
  	'click .js-Uninterested'(event, instance) {
  		console.log("You clicked Uninterested");
  		var profID = this._id;
  		var numlikes = userDB.findOne({_id: profID}).Uninterested;
 		if(!numlikes){
 			numlikes = 0;
 		}
 		numlikes= numlikes+1;
 		userDB.update({_id:profID}, {$set:{'Uninterested':numlikes}});
  	},
  	'click .js-delete'(event,instance) {
  		var profID = this._id;
  		var targetmodal = "#modaledit" + this._id
  		$("#" + profID).fadeOut("slow","swing",function(){
  			userDB.remove({_id:profID}); 	
  		});
  		$(targetmodal).modal('hide');
  	},
  	'click .profEdit'(events,instance) {
  		var targetmodal = "#modaledit" + this._id
  		$(targetmodal).modal('show');

  	},
  	'click .js-edit'(events,instance) {
  		var targetmodal = "#alterModal" + this._id
  		$(targetmodal).modal('show');

  	},
  	'click .js-altersave'(event, instance) {
  		var targetmodal = "#alterModal" + this._id
		var fname = $(targetmodal + ' input[name="firstName"]').val()
		var lname = $(targetmodal + ' input[name="lastName"]').val()
		var img = $(targetmodal + ' input[name="Image"]').val()
		if(img ==""){
			img=this.Image;
		}
		if(fname ==""){
			fname=this.firstName;
		}
		if(lname ==""){
			lname=this.lastName;
		}
		console.log("The name is",fname,lname);
		$(targetmodal + ' input[name="firstName"]').val('')
		$(targetmodal + ' input[name="lastName"]').val('')
		$(targetmodal + ' input[name="Image"]').val('')
		$(targetmodal).modal('hide');
		userDB.update({_id:this._id},{$set:{'firstName':fname,'lastName':lname, 'Image':img}});
  		
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