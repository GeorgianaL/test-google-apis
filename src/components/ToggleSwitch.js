import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./style.css";

class ToggleSwitch extends Component {
  state = {
    checked: this.props.defaultChecked
  };
  onChange = e => {
    this.setState({
      checked: e.target.checked
    });
    this.props.onChange();
  };
  render() {
    return (
      <div
        className={"toggle-switch" + (this.props.small ? " small-switch" : "")}
      >
        <input
          type="checkbox"
          name={this.props.name}
          className="toggle-switch-checkbox"
          id={this.props.id}
          checked={this.props.currentValue}
          defaultChecked={this.props.defaultChecked}
          onChange={this.onChange}
          disabled={this.props.disabled}
        />
        {this.props.id ? (
          <label className="toggle-switch-label" htmlFor={this.props.id}>
            <span
              className={
                this.props.disabled
                  ? "toggle-switch-inner toggle-switch-disabled"
                  : "toggle-switch-inner"
              }
              data-yes={this.props.text[0]}
              data-no={this.props.text[1]}
            />
            <span
              className={
                this.props.disabled
                  ? "toggle-switch-switch toggle-switch-disabled"
                  : "toggle-switch-switch"
              }
            />
          </label>
        ) : null}
      </div>
    );
  }

  static defaultProps = {
    text: ["Yes", "No"]
  };
}

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
  small: PropTypes.bool,
  currentValue: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ToggleSwitch;
