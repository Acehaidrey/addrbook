'use strict';

import React from 'react';
import $ from 'jquery';
import Button from './Button.react';
import Actions from '../Actions';
import contactStore from '../stores/contactStore';
import reactMixin from 'react-mixin';
import {listenTo} from 'reflux';


/**
 * Styled Button component. 
 */
export default class EditContactPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: {}
    }
    this.handleFName = this.handleFName.bind(this);
    this.handleLName = this.handleLName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updatedContact = this.updatedContact.bind(this);
    this.editContact = this.editContact.bind(this);
  }

  /**
   * Update the state of event to contain the first name passed in to the input box.
   * @param  event object
   */
  handleFName(event) {
    this.setState({
      contact: {
        firstName: event.target.value,
        lastName: this.state.contact.lastName,
        email:this.state.contact.email
      }
    });
  }

  /**
   * Update the state of event to contain the last name passed in to the input box.
   * @param  event object
   */
  handleLName(event) {
    this.setState({
      contact: {
        firstName: this.state.contact.firstName,
        lastName: event.target.value,
        email:this.state.contact.email
      }
    });
  }

  /**
   * Update the state of event to contain the email passed in to the input box.
   * @param  event object
   */
  handleEmail(event) {
    this.setState({
      contact: {
        firstName: this.state.contact.firstName,
        lastName: this.state.contact.lastName,
        email: event.target.value
      }
    });
  }

  /**
   * PUT request with updated characteristics of contact.
   * @param  {Object} e event
   */
  editContact(e) {
    e.preventDefault();
    var updates = this.updatedContact();
    Actions.editContact(updates);
  }

  onChange(event, contact) {
    this.setState({
      contact
    })
  }

  /**
   * Checks for which fields changed, and creates a new contact object with same id, along
   * with changed fields.
   * @return {Contact Object} Updated Contact. 
   */
  updatedContact() {
    var upContact = {
      id: this.props.params.id,
      contact: {}
    };
    if (this.state.firstName != '') {
      upContact.contact.firstName = this.state.contact.firstName;
    }
    if (this.state.lastName != '') {
      upContact.contact.lastName = this.state.contact.lastName;
    }
    if (this.state.email != '') {
      upContact.contact.email = this.state.contact.email;
    }

    return upContact;
  }

  componentDidMount() {
    var id = this.props.params.id;
    Actions.grabContact(id);
  }

  render() {
    return (
      <div>
        <p> This is my edit contact component. </p>
        <form>
            <p> <input type='text' value={this.state.contact.firstName} onChange={this.handleFName}/>
            Change first name. </p>
            <p> <input type='text' value={this.state.contact.lastName} onChange={this.handleLName}/>
            Change last name. </p>
            <p> <input type='text' value={this.state.contact.email} onChange={this.handleEmail}/>
            Change email. </p>
            <button type = 'submit' onClick={this.editContact} > Update Contact </button>
            <Button linkName='addressbook' buttonName='Return to Contacts' />
        </form>      
      </div>
    );
  }
}

reactMixin(EditContactPanel.prototype, listenTo(contactStore, 'onChange'));
