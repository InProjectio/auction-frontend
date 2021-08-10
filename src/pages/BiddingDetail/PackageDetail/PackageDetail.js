import React, { useState, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react'
import * as Api from 'api/api'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import chatIcon from 'images/chat.svg'
import { Link } from 'react-router-dom'
import shareIcon from 'images/share.svg'
import { Modal } from 'react-bootstrap'
import Summary from '../Summary'
import classes from './PackageDetail.module.scss'
import PackageInfo from '../PackageInfo'
import Bidders from '../Bidders'
import ShareLink from './ShareLink'
import SelectBidder from './SelectBidder'

const PackageDetail = forwardRef(({ packageId, handleSetDetail, type }, ref) => {
  const userInfo = useMemo(() => JSON.parse(localStorage.getItem('userInfo')), [])
  const [detail, setDetail] = useState({})
  const [show, setShow] = useState('INFO')
  const [showShareLink, setShowShareLink] = useState(false)
  const [showSelectBidder, setShowSelectBidder] = useState(false)
  const [winner, setWinner] = useState(null)

  const getDetail = async () => {
    try {
      const result = await Api.auction.get({
        url: '/api/bidding/package/find-detail',
        params: {
          packageId
        }
      })
      console.log('result.data', result.data)
      setDetail(result.data)
      handleSetDetail(result.data)
      if (result.data.status === 'CLOSING') {
        setWinner((result.data.biddings.find((item) => item.status === 'ACCEPT')))
      }
    } catch (e) {
      return Promise.reject
    }
  }

  useImperativeHandle(ref, () => ({
    getPackageDetail() {
      getDetail()
    }
  }));

  useEffect(() => {
    getDetail()
  }, [])
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Summary detail={detail} />
        <div className={classes.header}>
          <div className={classes.left}>
            <a
              className={classNames(classes.btn, show === 'INFO' && classes.active)}
              onClick={() => { setShow('INFO') }}
            >
              <FormattedMessage
                id="packageInfo"
                defaultMessage="Package information"
              />
            </a>
            <a
              className={classNames(classes.btn, show === 'BIDDERS' && classes.active)}
              onClick={() => { setShow('BIDDERS') }}
            >
              <FormattedMessage
                id="bidders"
                defaultMessage="Bidders"
              />
            </a>
          </div>
          <div className={classes.right}>
            { type === 'OFFEREE'
              ? (
                <a
                  className="btn btnSecond btnSmall"
                  onClick={() => setShowShareLink(true)}
                >
                  <img src={shareIcon} className={classes.shareIcon} alt="share" />
                  Share
                </a>
              )
              : (
                <Link to="/chat" className="btn btnMain btnSmall">
                  <img src={chatIcon} className={classes.chatIcon} alt="chat" />
                  {`Chat with ${detail?.offeree?.entityName}`}
                </Link>
              )}

          </div>
        </div>

        <div className={classes.wrapper}>
          { show === 'INFO'
            && (
            <PackageInfo
              detail={detail}
              setShowSelectBidder={setShowSelectBidder}
              winner={winner}
              userInfo={userInfo}
            />
            )}

          { show === 'BIDDERS'
            && <Bidders biddings={detail.biddings} type={type} />}

        </div>
      </div>

      <Modal
        show={showShareLink}
        onHide={() => setShowShareLink(false)}
      >
        <ShareLink
          packageId={packageId}
          handleClose={() => setShowShareLink(false)}
        />
      </Modal>

      <Modal
        show={showSelectBidder}
        onHide={() => setShowSelectBidder(false)}
      >
        <SelectBidder
          packageId={packageId}
          handleClose={() => setShowSelectBidder(false)}
          bidders={detail.biddings}
          selectBidderSuccess={getDetail}
        />
      </Modal>
    </div>
  )
})

export default PackageDetail
