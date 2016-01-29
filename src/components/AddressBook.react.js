'use strict';

import React from 'react';
import $ from 'jquery';
import Button from './Button.react';
import Contact from './Contact.react';
import Actions from '../Actions';
import contactStore from '../stores/contactStore';
import reactMixin from 'react-mixin';
import {listenTo} from 'reflux';

/**
 * Styled Button component. 
 */
export default class AddressBook extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    }
    // this.getContacts = this.getContacts.bind(this);
    this.delContact = this.delContact.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Sends DELETE request to remove contact from the server.
   */
  delContact(id, e) {
    e.preventDefault();
    Actions.deleteContact(id);
  }

  /**
   * Grabs the contacts from the server, and saves it to contacts in state object.
   */  
  onChange(event, contacts) {
    this.setState({ contacts });// ES6 short cut for contacts: contacts
  }

  /**
   * Preliminary getting contacts to display on UI.
   * Note to self: this happens before render, and only once its run
   */
  componentDidMount() {
    Actions.grabContacts();
  }

  render() {
    var delContact = this.delContact; //can use arrow notation too to bind 
    return (
      <div>
        <h4> My Contacts: </h4>
        <div className = 'entries'>
          {
            this.state.contacts.map(function (contact, index) {
              return (
                <span key={index}>
                  <Contact contactObj={contact} />
                  <button onClick={delContact.bind(null, contact.id)}> Delete </button>
                </span>
              );
            })
          }
        </div>
        <Button linkName='addcontactpanel' buttonName='Add Contact' />
      </div>
    );
  }
}

reactMixin(AddressBook.prototype, listenTo(contactStore, 'onChange'));
