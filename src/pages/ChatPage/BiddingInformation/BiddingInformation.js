import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Expand from 'react-expand-animated'
import caretIcon from 'images/caret.svg'
import classNames from 'classnames'
import defaultAvatar from 'images/defaultAvatar.svg'
import * as Api from 'api/api'
import defaultLogoCompany from 'images/defaultLogoCompany.jpg'
import classes from './BiddingInformation.module.scss'

const BiddingInformation = ({ selectedConversation }) => {
  const [showBidderMember, setShowBidderMember] = useState(false)
  const [showOffereeMember, setShowOffereeMember] = useState(false)
  const [detail, setDetail] = useState({})

  useEffect(async () => {
    try {
      const result = await Api.auction.get({
        url: '/api/chat/find-detail-conversation',
        params: {
          conversationId: selectedConversation._id
        }
      })

      setDetail(result.data)
    } catch (e) {
      return Promise.reject(e)
    }
  }, [selectedConversation._id])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <p className={classes.label}>
          Offeree:
        </p>

        <div className={classes.company}>
          <img className={classes.logo} alt="logo" src={detail?.package?.company?.logo || defaultLogoCompany} />
          <p className={classes.companyName}>
            <b>{detail?.tendererEntity?.entityName}</b>
            <br />
            { detail?.package?.company?.companyName }
          </p>
        </div>

        <p className={classes.label}>
          Bidder:
        </p>

        <div className={classes.company}>
          <img className={classes.logo} alt="logo" src={detail?.biddingEntity?.company?.logo || defaultLogoCompany} />
          <p className={classes.companyName}>
            <b>{detail?.biddingEntity?.entityName}</b>
            <br />
            { detail?.biddingEntity?.company?.companyName }
          </p>
        </div>

        <p className={classes.entityName}>
          { selectedConversation.title }
        </p>

      </div>

      <Link
        className={classes.btn}
        to={`/package-detail/${selectedConversation.package}`}
        target="_blank"
      >
        View bidding information
      </Link>

      <div
        className={classNames(classes.btn, showBidderMember && classes.open)}
        onClick={() => setShowBidderMember((prev) => !prev)}
      >
        <p className={classes.text}>
          Bidder’s entity member
        </p>
        <img src={caretIcon} className={classes.caretIcon} alt="icon" />
      </div>
      <Expand
        open={showBidderMember}
        duration={300}
      >
        <div className={classes.users}>
          { detail?.biddingEntity?.userMaps?.map((item) => (
            <div
              className={classes.user}
              key={item._id}
            >
              <img src={item?.user?.avatar_url || defaultAvatar} className={classes.avatar} alt="avatar" />
              <p className={classes.fullName}>
                { item?.user?.fullname || item?.email }
              </p>
            </div>
          )) }
        </div>

      </Expand>

      <div
        className={classNames(classes.btn, showOffereeMember && classes.open)}
        onClick={() => setShowOffereeMember((prev) => !prev)}
      >
        <p className={classes.text}>
          Offeree’s entity member
        </p>
        <img src={caretIcon} className={classes.caretIcon} alt="icon" />
      </div>
      <Expand
        open={showOffereeMember}
        duration={300}
      >
        <div className={classes.users}>
          { detail?.tendererEntity?.userMaps?.map((item) => (
            <div
              className={classes.user}
              key={item._id}
            >
              <img src={item?.user?.avatar_url || defaultAvatar} className={classes.avatar} alt="avatar" />
              <p className={classes.fullName}>
                { item?.user?.fullname || item?.email }
              </p>
            </div>
          )) }
        </div>
      </Expand>
    </div>
  )
}

export default BiddingInformation
