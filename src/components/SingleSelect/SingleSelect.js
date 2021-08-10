import React from 'react'
import classNames from 'classnames'
import Select from 'react-select';
// import FloatingLabelInput from 'react-floating-label-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown
} from '@fortawesome/free-solid-svg-icons'
// import DateTime from 'react-datetime'
import { DayPickerRangeController } from 'react-dates'
import 'react-dates/initialize';
import moment from 'moment'
import classes from './SingleSelect.module.scss'

const Icon = (props) => (
  <FontAwesomeIcon
    icon={props.selectProps.menuIsOpen ? faCaretUp : faCaretDown}
    className={classes.icon}
  />
);
const components = {
  DropdownIndicator: Icon,
};

export default class SelectField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
      focusedInput: '',
      startDate: moment(),
      endDate: moment()
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  moveUpPlaceholder = () => {
    this.setState({
      focus: true
    })
  }

  moveDownPlaceholder = () => {
    this.setState({
      focus: false
    })
  }

  handleChange = (selectOption) => {
    // console.log('handleChange', selectOption)
    if (selectOption.value === 'CUSTOM' && this.props.showCustomDate) {
      this.setState({
        // openDatePicker: true
        focusedInput: 'startDate',
        startDate: moment(selectOption.startDate),
        endDate: moment(selectOption.endDate)
      })
    } else {
      this.props.changeValue(selectOption)
    }
  }

  handleChangeDate = (date) => {
    this.setState({
      startDate: date.startDate,
      endDate: date.endDate
    })
    // console.log('handleChangeDate', date.startDate, date.endDate)
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        focusedInput: ''
      })
    }
  }

  handleCancel = () => {
    this.setState({
      focusedInput: ''
    })
  }

  handleSelect = () => {
    const { startDate, endDate } = this.state
    this.props.changeValue({
      label: 'CUSTOM',
      value: 'CUSTOM',
      startDate: startDate && startDate.format('YYYY-MM-DD'),
      endDate: endDate ? endDate.format('YYYY-MM-DD') : startDate.format('YYYY-MM-DD'),
    })
    this.setState({
      focusedInput: ''
    })
  }

  render() {
    const {
      value,
      disabled,
      options,
      customClass,
      loading,
      isClearable,
      placeholder,
      showCustomDate,
      showDateLeft,
      indicatorTop
    } = this.props
    let selectValue = value
    if (showCustomDate && value.value === 'CUSTOM') {
      selectValue = {
        ...value,
        label: value.startDate === value.endDate ? moment(value.startDate).format('DD.MM.YYYY')
          : `${moment(value.startDate).format('DD.MM.YYYY')} - ${moment(value.endDate).format('DD.MM.YYYY')}`
      }
    }
    const { focus, startDate, endDate } = this.state
    // console.log(startDate, endDate)
    return (
      <div className={classNames(classes.inputContainer, 'singleSelectContainer')}>
        <Select
          isClearable={isClearable}
          onChange={this.handleChange}
          value={selectValue}
          className={classNames(
            classes.input,
            customClass,
            focus && classes.focus,
            'singleSelect'
          )}
          disabled={disabled}
          onFocus={this.moveUpPlaceholder}
          onBlur={this.moveDownPlaceholder}
          options={options}
          isLoading={loading}
          placeholder={placeholder || ''}
          components={components}
          styles={{
            control: () => ({
              border: 0,
              padding: 0,
              margin: 0
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
            }),
            placeholder: () => ({
              fontSize: '14px',
              color: '#092631'
            })
          }}
        />
        {/* { showCustomDate
          && <DateTime timeFormat={false}
            open={openDatePicker}
            input={false}
            value={value.startDate || new Date()}
            onChange={this.handleChangeDate}
          />
        } */}

        { showCustomDate && this.state.focusedInput
          && (
          <div
            ref={(wrapperRef) => this.wrapperRef = wrapperRef}
            className={classNames(classes.dateRangerWrapper, showDateLeft && classes.dateRangerWrapperLeft)}
          >
            <DayPickerRangeController
              numberOfMonths={2}
              startDate={startDate}
              endDate={endDate}
              onDatesChange={this.handleChangeDate}
              focusedInput={this.state.focusedInput}
              onFocusChange={(focusedInput) => this.setState({ focusedInput: focusedInput || 'startDate' })}
              minimumNights={0}
            />
            <div className={classes.actions}>
              <a
                className="btn btnSmall mr15"
                onClick={this.handleCancel}
              >
                Huỷ
              </a>
              <a
                className="btn btnSmall btnBlue"
                onClick={this.handleSelect}
              >
                Áp dụng
              </a>
            </div>
          </div>
          )}

      </div>

    )
  }
}
