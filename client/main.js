import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

Template.profile.events({
  'click .js-Interested'(event, instance) {
   console.log("You clicked Interested");
  },
   'click .js-Uninterested'(event, instance) {
  console.log("You clicked Uninterested");
  },
  
});

Template.modal.events({
	'click .js-saveprofile'(event, instance) {
	var fname= $('#exampleModal input[name="FirstName"]').val();
	var lname= $('#exampleModal input[name="LastName"]').val();
  	var img= $('#exampleModal input[name="Image"]').val();
  	console.log("The First name is",fname);
  	console.log("The Last name is",lname);
  	console.log("The Image name is",img);
  	//resets the form to be blank
  	 $('#exampleModal input[name="FirstName"]').val("");
	 $('#exampleModal input[name="LastName"]').val("");
  	 $('#exampleModal input[name="Image"]').val("");
  	$('#exampleModal').modal('hide');
  }
})