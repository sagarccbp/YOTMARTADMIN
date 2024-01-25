import React, { Component } from "react";
import ToggleContent from "./ToggleContent";

export class ToggleData extends Component {
  render() {
    const { data } = this.props;
    return (
      <li className="dropdown dropdown-list-toggle">
        <a href="/chat" className={`nav-link nav-link-lg beep`}>
          <i className={data.iconName} />
        </a>
      </li>
    );
  }
}

export default ToggleData;
