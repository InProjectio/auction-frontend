import React from 'react'
import SocialLogin from 'react-social-login'
import classNames from 'classnames'
import classes from './SocialButton.module.scss'

const Button = ({ triggerLogin, customClass, children, ...rest }) => (
  <button
    onClick={triggerLogin}
    {...rest}
    className={classNames(classes.btn, customClass)}
    type="button"
  >
    { children }
  </button>
)

export default SocialLogin(Button)
