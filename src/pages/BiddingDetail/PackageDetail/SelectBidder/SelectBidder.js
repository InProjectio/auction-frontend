import React, { useState } from 'react'
import closeIcon from 'images/close.svg'
import Button from 'components/Button';
import * as Api from 'api/api'
import { useDispatch } from 'react-redux';
import { showNotification } from 'layout/CommonLayout/actions';
import { useSmartContract } from 'utils/smartContract/hooks';
import smartContractBidding from 'utils/smartContract/bidding';
import { convertSmartContractData } from 'utils/utils';
import classes from './SelectBidder.module.scss'
import SelectEntityField from './SelectEntityField';

const SelectBidder = ({ bidders, handleClose, packageId, selectBidderSuccess }) => {
  const [loading, handleSubmitMetaMask] = useSmartContract()

  const [selectedBidding, setSelectedBidding] = useState(null)

  const dispatch = useDispatch()

  const handleSelectBidder = async () => {
    try {
      if (!selectedBidding || !selectedBidding._id) {
        dispatch(showNotification({
          type: 'ERROR',
          message: 'Please slect a bidder'
        }))
        return
      }

      await handleSubmitMetaMask({
        transactionType: 'UPDATE',
        transactionSummary: 'Update bidding',
        smartContractCall: smartContractBidding.methods.editBidding(
          selectedBidding._id,
          convertSmartContractData({
            ...selectedBidding,
            biddingId: selectedBidding._id,
            status: 'ACCEPT'
          })
        ),
        apiCall: (transactionHash) => Api.auction.put({
          url: `/api/bidding/package/select-win-bidding/${packageId}`,
          data: {
            biddingId: selectedBidding._id,
            transactionHash
          }
        })
      })

      selectBidderSuccess()

      handleClose()
    } catch (e) {
      Promise.reject(e)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.head}>
        <p className={classes.title}>
          Select bidders
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
          Bidders
        </p>
        <SelectEntityField
          options={bidders}
          input={{
            value: selectedBidding,
            onChange: (value) => setSelectedBidding(value)
          }}
        />
      </div>

      <div className={classes.actions}>
        <Button
          className="btn btnMain btnSmall"
          loading={loading}
          onClick={handleSelectBidder}
        >
          Select
        </Button>

      </div>
    </div>
  )
}

export default SelectBidder
