import React, { useRef, useState } from 'react'
import classNames from 'classnames'
import { Modal, Overlay, Tooltip } from 'react-bootstrap'
import closeIcon from 'images/close.svg'
import foreignIcon from 'images/foreign.svg'
import copyIcon from 'images/copy.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classes from './MyWallet.module.scss'

const MyWallet = ({ show, handleClose, currentAccount, handleLogoutWallet }) => {
  const target = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false)

  const handleLogout = async () => {
    handleLogoutWallet()
    handleClose()
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
    >
      <div className={classes.head}>
        <p className={classes.title}>
          Your wallet
        </p>
        <a onClick={handleClose}>
          <img src={closeIcon} className={classes.closeIcon} alt="closeIcon" />
        </a>

      </div>
      <div className={classes.content}>
        <p className={classes.address}>
          { currentAccount }
        </p>
        <div className={classes.actions}>
          <a
            className={classNames(classes.btn, classes.mr20)}
            href={`https://testnet.bscscan.com/address/${currentAccount}`}
            target="__blank"
          >
            View on BscScan
            <img src={foreignIcon} className={classes.foreignIcon} alt="foreignIcon" />
          </a>
          <CopyToClipboard
            text={currentAccount}
            onCopy={() => {
              setShowTooltip(true)
              setTimeout(() => {
                setShowTooltip(false)
              }, 3000)
            }}
          >
            <a
              className={classes.btn}
              ref={target}
            >
              Copy address
              <img src={copyIcon} className={classes.copyIcon} alt="copyIcon" />
            </a>
          </CopyToClipboard>
          <Overlay target={target.current} show={showTooltip} placement="right">
            {(props) => (
              <Tooltip id="overlay-example" {...props}>
                Copied!
              </Tooltip>
            )}
          </Overlay>

        </div>
        <div className={classes.center}>
          <a
            className={classes.logout}
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
      </div>
    </Modal>
  )
}

export default MyWallet
