import React, { Component } from 'react'
import classNames from 'classnames'
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize';
import { HORIZONTAL_ORIENTATION } from 'react-dates/constants'
import moment from 'moment'
import { renderField } from '../../Form'
import classes from './RangerDatePicker.module.scss'

export class RangerDatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focusedInput: null,
    }
  }

  openPopupDate = (e) => {
    if (!e.target.contains(this.removeRef)) {
      this.setState({
        focusedInput: 'startDate',
      })
    }
  }

  handleDateChange = (dateRanger) => {
    let dateRanderVal = dateRanger
    const { input } = this.props
    const dateValue = input.value
    if (dateValue && dateValue.endDate && dateRanger.endDate
      && dateValue.endDate.format('DD/MM/YYYY') === dateRanger.endDate.format('DD/MM/YYYY')) {
      dateRanderVal = {
        ...dateRanger,
        endDate: null,
      }
    }
    input.onChange(dateRanderVal)
  }

  removeDateRanger = () => {
    const { input } = this.props
    input.onChange({
      startDate: null,
      endDate: null,
    })
    this.setState({
      focusedInput: null,
    })
  }

  renderDate = (startDate, endDate) => {
    if (startDate && !endDate) {
      return startDate.format('DD/MM/YYYY')
    }
    if (startDate && endDate) {
      return `${startDate.format('DD/MM/YYYY')} - ${endDate.format('DD/MM/YYYY')}`
    }

    return ''
  }

  render() {
    const { input, notShowRemove = false, furture } = this.props
    const { startDate, endDate } = input.value
    const dateDisplay = this.renderDate(startDate, endDate)
    return (
      <div className={classes.datePickerWrapper} onClick={this.openPopupDate}>
        <input
          type="text"
          className={classes.dateTime}
          placeholder="Chọn thời gian"
          value={dateDisplay}
          readOnly
        />
        <DateRangePicker
          startDate={startDate}
          startDateId="start_date"
          endDate={endDate}
          endDateId="end_date"
          onDatesChange={this.handleDateChange}
          focusedInput={this.state.focusedInput}
          onFocusChange={(focusedInput) => this.setState({ focusedInput })}
          orientation={HORIZONTAL_ORIENTATION}
          minimumNights={0}
          isOutsideRange={(day) => {
            // const isBeforeStart = noPassDate && day.startOf('day').isBefore(moment().startOf('day'))
            const isAfterToday = day.isAfter(moment().endOf('day'))

            // return this.props.no90Days ? isAfterToday : isBeforeStart || isAfterToday
            return furture ? day.startOf('day').isBefore(moment().startOf('day')) : isAfterToday
          }}
        />
        {/* <img
          src={dateIcon}
          className={classes.iconCalendar}
          alt="date-icon"
        /> */}
        {!notShowRemove && (startDate || endDate) && (
        <span
          ref={(removeRef) => { this.removeRef = removeRef }}
          onClick={this.removeDateRanger}
          className={classNames('glyphicon glyphicon-remove', classes.iconRemove)}
        />
        )}
      </div>
    )
  }
}

export default renderField(RangerDatePicker)
