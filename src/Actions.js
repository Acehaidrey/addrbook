import {createActions} from 'reflux';

export default createActions (['grabContacts', 'deleteContact', 'addContact', 'grabContact', 'editContact']); 
// method that belongs to reflux. taking an array, its whatever actions you
// want to have. ex) Actions.grabContacts() = like creating a method for it
