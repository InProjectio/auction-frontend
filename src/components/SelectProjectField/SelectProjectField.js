import React from 'react'
import classNames from 'classnames'
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import PerfectScrollbar from 'react-perfect-scrollbar'
import renderField from '../../Form/renderField'
import classes from './SelectProjectField.module.scss'

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

function Option(props) {
  const data = props.data
  return (
    <div
      className={classNames(classes.option, props.isSelected && classes.selected)}
      onClick={() => props.selectOption(data)}
      key={data._id}
    >
      <p className={classes.workspace}>
        { data.workspaceName }
      </p>
      <p className={classes.project}>
        { data.label }
      </p>
    </div>
  )
}

const components = {
  DropdownIndicator: Icon,
  MenuList,
  Option
};

export class SelectProjectField extends React.Component {
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
    } = this.props
    const { focus } = this.state
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
            bb1 && classes.bb1)}
          isClearable
          type={type}
          isDisabled={disabled}
          onFocus={this.moveUpPlaceholder}
          onBlur={this.moveDownPlaceholder}
          options={options}
          isLoading={loading}
          placeholder="Select project"
          components={components}
          isSearchable={searchable}
          getOptionValue={(option) => option.value}
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

export default renderField(SelectProjectField)
