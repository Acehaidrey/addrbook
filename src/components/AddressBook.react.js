'use strict';

import React from 'react';
import $ from 'jquery';

/**
 * Styled Button component. 
 */
export default class AddressBook extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p> This is my addrbook component. </p>
      </div>
    );
  }
}

        // <div className = 'entries'>
        //   {
        //     this.state.contacts.map(function (contact, index) {
        //       return (
        //         <span key={index}>
        //           <div onClick={editClick.bind(null)}> {contact.lastName}, {contact.firstName} </div>
        //           <button onClick={delContact.bind(null, contact.id)}> Delete </button>
        //         </span>
        //       );
        //     })
        //   }
        // </div>
