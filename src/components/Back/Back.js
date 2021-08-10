import React from 'react'
import arrowLeft from 'images/arrow-left.svg'
import classes from './Back.module.scss'

const Button = ({ children, onClick }) => (
  <a
    className={classes.container}
    onClick={onClick}
  >
    <img src={arrowLeft} alt="arrow-left" className={classes.icon} />
    <span className={classes.text}>
      { children }
    </span>
  </a>
)

export default Button
