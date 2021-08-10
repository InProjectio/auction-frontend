import React from 'react'
import classNames from 'classnames'
import Select from 'react-select';
import PerfectScrollbar from 'react-perfect-scrollbar'
import arrowDownIcon from '../../images/arrow-down.svg'
import renderField from '../../Form/renderField'
import classes from './SelectField.module.scss'

const Icon = (props) => (
  <img
    src={arrowDownIcon}
    className={classNames(classes.icon, props.selectProps.menuIsOpen && classes.iconUp)}
    alt="icon"
  />
);

function MenuList(props) {
  return (
    <div style={{ height: props.children.length >= 7 ? 250 : 'unset' }}>
      <PerfectScrollbar>{props.children}</PerfectScrollbar>
    </div>
  );
}

const components = {
  DropdownIndicator: Icon,
  MenuList,
};

export class SelectField extends React.Component {
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
      placeholder,
      name,
      type,
      disabled,
      options,
      customClass,
      fullBorder,
      loading,
      hasError,
      marginControl,
      intl,
      h40,
      bb1,
      isClearable,
      valueContainerStyles = {},
      searchable = true,
      isMulti
    } = this.props
    const { focus } = this.state
    let placeholderStr = ''
    if (placeholder) {
      if (typeof placeholder === 'string') {
        placeholderStr = placeholder
      } else {
        placeholderStr = intl.formatMessage(placeholder)
      }
    }
    let marginControlValue = marginControl
    if (h40 || !searchable) {
      marginControlValue = '2px 0 0 0'
    }
    return (
      <div className={classes.inputContainer}>
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
            bb1 && classes.bb1,
            isMulti && classes.isMulti)}
          isClearable={isClearable}
          type={type}
          isDisabled={disabled}
          onFocus={this.moveUpPlaceholder}
          onBlur={this.moveDownPlaceholder}
          options={options}
          isLoading={loading}
          placeholder={placeholderStr}
          components={components}
          isSearchable={searchable}
          isMulti={isMulti}
          styles={{
            control: () => ({
              border: 0,
              padding: 0,
              margin: marginControlValue || '2px 0 0 0px'
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
              paddingRight: (marginControl === '0' || isClearable) ? 60 : 'unset'
            })
          }}
        />
      </div>

    )
  }
}

export default renderField(SelectField)
