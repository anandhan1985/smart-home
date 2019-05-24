import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
export default class DropdownComp extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }
      
      logOutFunc = () => {
        window.location.reload();
      }

  render() {
    return (
      <div>
        
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
        
        </DropdownToggle>
        <DropdownMenu>
          {/* <DropdownItem header>Header</DropdownItem> */}
          <DropdownItem onClick={this.logOutFunc}>Log Out</DropdownItem>
          {/* <DropdownItem disabled>Action (disabled)</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Foo Action</DropdownItem>
          <DropdownItem>Bar Action</DropdownItem>
          <DropdownItem>Quo Action</DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
      </div>
    )
  }
}
