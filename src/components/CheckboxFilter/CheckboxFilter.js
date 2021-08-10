import React from 'react'
import Select, { components } from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import classes from './CheckboxFilter.module.scss'

const MenuList = ({ children, ...rest }) => (
  <div className={classes.menuList}>
    <components.MenuList {...rest}>
      {children}
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

const styles = {
  option: (base, state) => ({
    ...base,
    padding: '8px 15px',
    backgroundColor: state.isSelected && '#ffffff',
    color: state.isSelected && '#000',
    '&:hover': {
      backgroundColor: '#3f6ad8',
      color: '#fff'
    }
  }),
  menu: () => ({
    // ...base,
  }),
  menuList: (base) => ({
    ...base,
  }),
  control: (base) => ({
    ...base,
    margin: '15px 10px 10px 10px'
  })
};

const CheckboxFilter = ({ onChange, options, value, buttonFilter }) => (
  <Select
    menuIsOpen
    controlShouldRenderValue={false}
    onChange={onChange}
    components={{ Option, MenuList }}
    closeMenuOnSelect={false}
    hideSelectedOptions={false}
    options={options}
    isMulti
    styles={{
      ...styles,
      ...buttonFilter && { control: () => ({ display: 'none' }) },
    }}
    value={value}
  />
)

export default CheckboxFilter
