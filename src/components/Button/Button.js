import React from 'react'
import classNames from 'classnames'
import Loader from 'react-loader-spinner'
import classes from './Button.module.scss'

const Button = ({ loading, loadingColor, className, children, onClick, disabled, type = 'button' }) => (
  <button
    className={classNames(classes.btn, className,
      loading && classes.eventNone,
      disabled && classes.disabled)}
    onClick={onClick}
    type={type}
  >
    {children}
    { loading
      && (
      <div className={classes.loader}>
        <Loader type="Oval" color={loadingColor || '#ffffff'} height={16} width={16} />
      </div>
      )}
  </button>
)

export default Button
