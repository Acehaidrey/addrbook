import $ from 'jquery';
import {createStore} from 'reflux';
import Actions from '../Actions';

export default createStore ({
  //listen to actions
  listenables: [Actions],
  grabContacts: function() {
    $.ajax({
      url: '/api/contacts',
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        this.contacts = res;
        this.triggerChange();
      }.bind(this)
    });
  },
  triggerChange: function() {
    this.trigger('change', this.contacts); 
  },
  deleteContact: function (id) {
    $.ajax({
      url: '/api/contacts/' + id,
      type: 'DELETE',
      dataType: 'json',
      success: function(res) {
        console.log(res);
        this.contacts = res;
        this.triggerChange();
      }.bind(this)
    });
  }, 
  addContact: function(contact) {
    $.ajax({
      url:'/api/contacts',
      type: 'POST',
      dataType: 'json',
      data: contact,
      success: function(res) {
        console.log('post was performed.');
      }.bind(this)
    });
  }, 
  editContact: function(contact) {
    $.ajax({
      url: '/api/contacts/',
      type: 'PUT',
      dataType: 'json',
      data: contact,
      success: function(res) {
        console.log('update was performed.');
      }.bind(this)
    });
  },
  grabContact:function(id) {
    $.ajax({
      url: '/api/contacts/' + id,
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        this.contact = res;
        this.triggerChangeId();
      }.bind(this)
    });
  },
  triggerChangeId() {
    this.trigger('change', this.contact); 
  }

})
