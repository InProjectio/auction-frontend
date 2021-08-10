import React from 'react'
import Fade from 'react-reveal/Fade'
import Loader from 'react-loader-spinner'
import classes from './LoadingComponent.module.scss'

const LoadingComponent = ({ loading, children }) => (
  <div className={classes.container}>
    { loading
      ? (
        <div className={classes.loader}>
          <Loader type="Oval" color="rgba(31, 125, 161, 0.5)" height={40} width={40} />
        </div>
      )
      : (
        <>
          <Fade>
            { children }
          </Fade>
        </>
      )}
  </div>
)

export default LoadingComponent
