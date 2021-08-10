import React from 'react'
import moment from 'moment'

const MONTHMAP = {
  1: 'Styczeń',
  2: 'Luty',
  3: 'Marzec',
  4: 'Kwiecień',
  5: 'Maj',
  6: 'Czerwiec',
  7: 'Lipiec',
  8: 'Sierpień',
  9: 'Wrzesień',
  10: 'Październik',
  11: 'Listopad',
  12: 'Grudzień'
}

const getDays = (showLabel) => {
  const days = []

  days.push(<option value="" disabled>{showLabel ? 'Dzień' : ''}</option>)

  for (let i = 1; i <= 31; i += 1) {
    days.push(<option value={`${i}`}>{i}</option>)
  }

  return days
}

const getMonths = (showLabel) => {
  const months = []

  months.push(<option value="" disabled>{showLabel ? 'Miesiąc' : ''}</option>)

  for (let i = 1; i <= 12; i += 1) {
    months.push(<option value={`${i}`}>{MONTHMAP[i]}</option>)
  }

  return months
}

const getYears = (max, min, showLabel, value) => {
  const years = []
  let maxYear
  let minYear

  if (!!max && !!min) {
    // Max and min year
    maxYear = moment(max).year()
    minYear = moment(min).year()
  } else if (!!max && !min) {
    // Only max year
    maxYear = moment(max).year()
    minYear = 1900
  } else if (!max && !!min) {
    // Only min year
    maxYear = moment().year()
    minYear = moment(min).year()
  } else {
    // No max or min
    maxYear = moment(max).year()
    minYear = 1900
  }

  if (value) {
    if (value > maxYear) {
      maxYear = value
    }

    if (value < minYear) {
      minYear = value
    }
  }

  years.push(<option value="" disabled>{showLabel ? 'Rok' : ''}</option>)

  for (let i = maxYear; i >= minYear; i -= 1) {
    years.push(<option value={`${i}`}>{i}</option>)
  }

  return years
}

export { getDays, getMonths, getYears }
