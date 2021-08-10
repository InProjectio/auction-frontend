import React, { useRef, useState } from 'react'
import closeIcon from 'images/close.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Overlay, Tooltip } from 'react-bootstrap'
import classes from './ShareLink.module.scss'

const ShareLink = ({ packageId, handleClose }) => {
  const target = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className={classes.container}>
      <div className={classes.head}>
        <p className={classes.title}>
          Share link
        </p>
        <a
          className={classes.btnClose}
          onClick={handleClose}
        >
          <img src={closeIcon} className={classes.closeIcon} alt="closeIcon" />
        </a>
      </div>

      <div className={classes.content}>
        <p className={classes.label}>
          Link
        </p>
        <input
          className={classes.input}
          defaultValue={`${process.env.REACT_APP_DOMAIN}/package-detail/${packageId}`}
        />
      </div>

      <div className={classes.actions}>
        <CopyToClipboard
          text={`${process.env.REACT_APP_DOMAIN}/package-detail/${packageId}`}
          onCopy={() => {
            setShowTooltip(true)
            setTimeout(() => {
              setShowTooltip(false)
            }, 3000)
          }}
        >
          <a
            className="btn btnMain btnSmall"
            ref={target}
          >
            Copy
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
    </div>
  )
}

export default ShareLink
