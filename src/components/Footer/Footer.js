import React from 'react'
// import classNames from 'classnames'
import logo from 'images/white-logo.svg'
import instagramIcon from 'images/instagram.svg'
import facebookIcon from 'images/facebook.svg'
import youtubeIcon from 'images/youtube.svg'
// import moneyIcon from 'images/money-white.svg'
// import language from 'images/language.svg'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import classes from './Footer.module.scss'

const Footer = () => (
  <div className={classes.container}>
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <div className={classes.left}>
          <Link to="/">
            <img src={logo} className={classes.logo} alt="logo" />
          </Link>
        </div>
        <div className={classes.right}>
          <div className={classes.rowBetween}>
            <div className={classes.row}>
              <Link
                className={classes.menu}
                to="/about"
              >
                <FormattedMessage
                  id="Footer.about"
                  defaultMessage="VỀ CARCLICK"
                />
              </Link>
              <Link to="/about/term-condition" className={classes.menu}>
                <FormattedMessage
                  id="Footer.ternAndCondition"
                  defaultMessage="ĐIỀU KHOẢN HOẠT ĐỘNG"
                />
              </Link>
              <Link
                className={classes.menu}
                to="/about"
              >
                <FormattedMessage
                  id="Footer.contact"
                  defaultMessage="LIÊN HỆ"
                />
              </Link>
            </div>

            <div className={classes.socials}>
              <img src={facebookIcon} className={classes.icon} alt="icon" />
              <img src={instagramIcon} className={classes.icon} alt="icon" />
              <img src={youtubeIcon} className={classes.icon} alt="icon" />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.copyRight}>
        @ 2020 CarClick. Bản quyền thuộc về Công ty TNHH CarClick Việt Nam. MSDN: 0123456789. Tòa nhà 210 tòa nhà Capital Tower số 291 Trung Kính, Cầu Giấy, Hà Nội
      </div>
    </div>
  </div>
)

export default Footer
