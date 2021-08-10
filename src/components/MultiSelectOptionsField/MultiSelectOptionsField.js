import React from 'react'
import Select, { components } from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { faCheck, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import classes from './MultiSelectOptionsField.module.scss'

const Icon = (props) => (
  <FontAwesomeIcon
    icon={props.selectProps.menuIsOpen ? faCaretUp : faCaretDown}
    className={classes.icon}
  />
);

const MenuList = (props) => (
  <div className={classes.menuList}>
    <components.MenuList {...props}>
      {props.children}
    </components.MenuList>
  </div>
)

const Option = (props) => (
  <div className={classes.filterGroup}>
    <components.Option {...props}>
      <div className={classes.filterOption}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          className={classes.checkbox}
        />
        <span className={classes.checkboxCustom}>
          <FontAwesomeIcon icon={faCheck} className={classes.checkIcon} />
        </span>
        <label className={classes.label}>
          {' '}
          {props.label}
          {' '}
        </label>
      </div>
    </components.Option>
  </div>
)

export class MultiSelectOptionsField extends React.Component {
  onChange = (value) => {
    this.props.input.onChange(value)
  }

  render() {
    const {
      options,
      input,
      indicatorTop,
      placeholder,
      name
    } = this.props
    return (
      <Select
        // menuIsOpen
        // controlShouldRenderValue={false}
        className={classNames(classes.input,
          'selectField')}
        onChange={this.onChange}
        components={{ Option, MenuList, DropdownIndicator: Icon }}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        options={options}
        isMulti
        placeholder={placeholder}
        value={input.value}
        instanceId={name}
        styles={{
          control: () => ({
            border: 0,
            padding: 0,
            margin: '2px 0 0 0px'
          }),
          indicatorsContainer: () => ({
            position: 'absolute',
            top: indicatorTop || '6px',
            right: 0
          }),
          loadingIndicator: () => ({
            position: 'absolute',
            top: '15px',
            right: '25px',
            width: '45px',
            fontSize: '6px',
            color: '#999999',
          })
        }}
      />
    )
  }
}

export default MultiSelectOptionsField
