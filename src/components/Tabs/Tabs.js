import React from 'react'
import { injectIntl } from 'react-intl'
import classNames from 'classnames'
import classes from './Tabs.module.scss'

const Tabs = (props) => {
  const { options, mw1200, value, handleClickOption } = props
  return (
    <div className={classNames(classes.container, mw1200 && classes.mw1200)}>
      <div className={classes.navs}>
        { options.map((option, i) => (
          <a
            key={option.value}
            className={classNames(classes.nav, value === option.value && classes.active)}
            onClick={() => handleClickOption(option.value, i)}
          >
            <span>
              { option.label }
            </span>
          </a>
        )) }
      </div>
    </div>
  )
}

export default injectIntl(Tabs)
