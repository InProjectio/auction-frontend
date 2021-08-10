import React, { useMemo } from 'react'
import classNames from 'classnames'
import classes from './Status.module.scss'

const Status = ({ status }) => {
  const statusDisplay = useMemo(() => {
    switch (status) {
      case 'CLOSING':
        return 'Done'
      case 'CANCEL':
        return 'Cancel'
      case 'BIDDING':
        return 'Bidding'
      case 'SELECTING':
        return 'Selecting'
      default:
        return status
    }
  }, [status])

  return (
    <div className={classNames(classes.container, (status === 'CLOSING' || status === 'CANCEL') && classes.finish)}>
      { statusDisplay }
    </div>
  )
}

export default Status
