import React from 'react'
import Loader from 'react-loader-spinner'
import classes from './LoadingIndicator.module.scss'

const LoadingIndicator = () => (
  <div className={classes.loading}>
    <Loader type="Oval" color="#007aff" height={30} width={30} />
  </div>
)

export default LoadingIndicator
