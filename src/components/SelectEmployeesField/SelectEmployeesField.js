import React from 'react'
import classNames from 'classnames'
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import PerfectScrollbar from 'react-perfect-scrollbar'
import defaultAvatar from 'images/defaultAvatar.svg'
import closeIcon from 'images/close.svg'
import renderField from '../../Form/renderField'
import classes from './SelectEmployeesField.module.scss'

const Icon = () => (
  <FontAwesomeIcon
    icon={faSearch}
    className={classes.icon}
  />
);

function MenuList(props) {
  return (
    <div style={{ height: props.children.length >= 7 ? 250 : 'unset' }}>
      <PerfectScrollbar>{props.children}</PerfectScrollbar>
    </div>
  );
}

function MultiValue(props) {
  const data = props.data
  return (
    <div
      className={classes.valueWrapper}
      key={data._id}
    >
      <img src={data?.user?.avatar_url || defaultAvatar} className={classes.avatar} alt="avatar" />
      <p className={classes.name}>
        { data?.user?.fullname || data.user?.email }
      </p>
      <a
        className={classes.btnClose}
        onClick={() => props.removeProps.onClick()}
      >
        <img src={closeIcon} className={classes.closeIcon} alt="close" />
      </a>
    </div>
  )
}

function Option(props) {
  const data = props.data
  return (
    <div
      className={classes.option}
      onClick={() => props.selectOption(data)}
      key={data._id}
    >
      <img src={data.user?.avatar_url || defaultAvatar} className={classes.avatar} alt="avatar" />
      <p className={classes.name}>
        { data.user?.fullname || data.user?.email }
      </p>
    </div>
  )
}

const components = {
  DropdownIndicator: Icon,
  MenuList,
  MultiValue,
  Option
};

export class SelectEmployeesField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false
    }
  }

  moveUpPlaceholder = () => {
    this.setState({
      focus: true
    })
    const { input } = this.props
    if (input && input.onFocus) {
      input.onFocus()
    }
  }

  moveDownPlaceholder = () => {
    this.setState({
      focus: false
    })
    const { input } = this.props
    if (input && input.onBlur) {
      input.onBlur()
    }
  }

  handleChange = (selectOption) => {
    this.props.input.onChange(selectOption)
    if (this.props.onChange) {
      this.props.onChange(selectOption)
    }
  }

  render() {
    const {
      input,
      name,
      type,
      disabled,
      options,
      customClass,
      fullBorder,
      loading,
      hasError,
      marginControl,
      h40,
      bb1,
      valueContainerStyles = {},
      searchable = true,
      userCreated
    } = this.props
    const { focus } = this.state
    let marginControlValue = marginControl
    if (h40 || !searchable) {
      marginControlValue = '2px 0 0 0'
    }
    return (
      <div className={classes.inputContainer}>
        { userCreated
          && (
          <div className={classes.currentUser}>
            <img src={userCreated.avatar_url || defaultAvatar} className={classes.avatar} alt="avatar" />
            <div className={classes.info}>
              <p className={classes.name}>
                { userCreated.fullname }
              </p>
              <p className={classes.email}>
                { userCreated.email }
              </p>
              <p className={classes.position}>
                { userCreated?.userMapping?.position }
              </p>
            </div>
          </div>
          )}
        <Select
          onChange={this.handleChange}
          value={input.value || null}
          name={name}
          instanceId={name}
          className={classNames(classes.input,
            fullBorder && classes.fullBorder,
            customClass,
            focus && classes.focus,
            'selectField',
            hasError && classes.errorField,
            h40 && classes.h40,
            bb1 && classes.bb1)}
          isClearable
          isMulti
          type={type}
          isDisabled={disabled}
          onFocus={this.moveUpPlaceholder}
          onBlur={this.moveDownPlaceholder}
          options={options}
          isLoading={loading}
          placeholder="Select employee"
          components={components}
          isSearchable={searchable}
          getOptionValue={(option) => option.user._id}
          styles={{
            control: () => ({
              border: 0,
              padding: 0,
              margin: marginControlValue || '5px 0 0 0px'
            }),
            indicatorsContainer: () => ({
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: 8,
              display: 'flex',
              alignItems: 'center'
            }),
            indicatorSeparator: () => ({

            }),
            loadingIndicator: () => ({
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '25px',
              width: '45px',
              fontSize: '6px',
              color: '#999999',
            }),
            valueContainer: (styles) => ({
              ...styles,
              padding: (h40 ? '2px 16px' : styles.padding),
              ...valueContainerStyles
            }),
            singleValue: (styles) => ({
              ...styles,
              paddingRight: (marginControl === '0') ? 60 : 'unset'
            })
          }}
        />
      </div>

    )
  }
}

export default renderField(SelectEmployeesField)
