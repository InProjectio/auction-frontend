import React from 'react'
import classNames from 'classnames'
import classes from './MultiSelectFilter.module.scss'

const MultiSelectFilter = ({ options, selectedValues }) => (
  <div className={classes.container}>
    { options && options.map((option) => (
      <div
        key={option.value}
        className={classNames(classes.option, selectedValues.indexOf(option.value) !== -1 && classes.active)}
      >
        { option.label }
      </div>
    )) }
  </div>
)

export default MultiSelectFilter
