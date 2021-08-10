import React from 'react'
import classNames from 'classnames'
import Select, { components } from 'react-select';
import { FormattedMessage } from 'react-intl'
// import FloatingLabelInput from 'react-floating-label-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faCheck
} from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';
import classes from './MultiSelect.module.scss'

const Icon = (props) => (
  <FontAwesomeIcon
    icon={props.selectProps.menuIsOpen ? faCaretUp : faCaretDown}
    className={classes.icon}
  />
);

const MultiValueContainer = ({ selectProps, data }) => {
  const label = data.label;
  const allSelected = selectProps.value;
  const index = allSelected.findIndex((selected) => selected.label === label);
  const isLastSelected = index === allSelected.length - 1;
  const labelSuffix = isLastSelected ? '' : ', ';
  const val = `${label}${labelSuffix}`;
  return val;
};

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

const MenuList = (props) => (
  <>
    <components.MenuList {...props}>
      {props.children}
    </components.MenuList>
    <div className={classes.actions}>
      <Button
        className={classNames('btn', classes.btnCancel)}
        onClick={() => {
          props.selectProps.handleCancel()
          props.selectProps.onMenuClose()
        }}
      >
        <FormattedMessage
          id="FilterBox.cancel"
          defaultMessage="Anuluj"
        />
      </Button>
      <Button
        className={classNames('btn btnBlue', classes.btnAccept)}
        onClick={() => {
          props.selectProps.handleConfirm()
          props.selectProps.onMenuClose()
        }}
      >
        <FormattedMessage
          id="FilterBox.accept"
          defaultMessage="Zastosuj"
        />
      </Button>
    </div>
  </>
);

export default class SelectField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
      temp: []
    }
  }

  onCancel = () => {
    const { onChange, name } = this.props
    const { temp } = this.state
    onChange({ [name]: temp })
  }

  onAccceptSelection = async () => {
    const { onAcceptFilter, value } = this.props
    this.setState({ temp: value })
    onAcceptFilter()
  }

  handleChange = (selectOption) => {
    const { limit, onChange, name } = this.props;
    if (limit) {
      if (selectOption.length <= limit) {
        onChange({
          [name]: selectOption
        })
      }
    } else {
      onChange({
        [name]: selectOption
      })
    }
  }

  onFocus = () => {
    const { value } = this.props
    this.setState({ temp: value })
  }

  render() {
    const {
      disabled,
      options,
      customClass,
      loading,
      isClearable = false,
      value,
      placeholder
    } = this.props
    const { focus } = this.state
    return (
      <div className={classes.inputContainer}>
        <Select
          isClearable={isClearable}
          onChange={this.handleChange}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          value={value}
          onFocus={this.onFocus}
          isMulti
          className={classNames(
            classes.input,
            customClass,
            focus && classes.focus,
            'singleSelect'
          )}
          disabled={disabled}
          options={options}
          isLoading={loading}
          placeholder={placeholder}
          handleConfirm={this.onAccceptSelection}
          handleCancel={this.onCancel}
          components={{
            DropdownIndicator: Icon,
            Option,
            // Control,
            MultiValueContainer,
            MenuList,
          }}
          styles={{
            input: () => ({
              color: 'transparent',
              textShadow: '0 0 0 #000',
            }),
            control: () => ({
              border: 0,
              padding: 0,
              margin: 0,
            }),
            indicatorsContainer: () => ({
              position: 'absolute',
              top: '3px',
              right: 0,
              display: 'inline',
            }),
            loadingIndicator: () => ({
              position: 'absolute',
              top: '15px',
              right: '25px',
              width: '45px',
              fontSize: '6px',
              color: '#999999',
            }),
            menu: (styles) => ({
              ...styles,
              minWidth: 300,
            }),
            valueContainer: () => ({
              display: 'block',
              maxWidth: 'calc(100% - 60px)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginTop: 10
            })
          }}
        />
      </div>

    )
  }
}
