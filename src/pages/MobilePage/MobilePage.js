import React from 'react'
import roundBackground from 'images/round-bg.png'
import logo from 'images/sidebar/logo.png'
import mobileScreen from 'images/mobile-screen.png'
import appStore from 'images/apple-store.png'
import googlePlay from 'images/google-play.png'
import classNames from 'classnames'
import classes from './MobilePage.module.scss'

const MobilePage = () => (
  <div className={classes.container}>
    <div className={classes.content}>
      <img src={logo} className={classes.logo} alt="logo" />
      <p className={classes.message}>
        Please use PC for best experience.
      </p>
      <p className={classes.note}>
        Mobile app is under development.
      </p>
      <img src={mobileScreen} className={classes.mobileScreen} alt="img" />
    </div>
    <div className={classes.bottom}>
      <div className={classes.rounderBackground}>
        <img src={roundBackground} className={classes.roundBackgroundImage} alt="img" />
      </div>
      <div className={classes.bottomContent}>
        <a className={classNames(classes.btn, classes.mr20)}>
          <img src={appStore} className={classes.store} alt="store" />
        </a>
        <a className={classes.btn}>
          <img src={googlePlay} className={classes.store} alt="store" />
        </a>
      </div>
    </div>
  </div>
)

export default MobilePage
