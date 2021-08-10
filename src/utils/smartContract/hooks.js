import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showNotification } from 'layout/CommonLayout/actions'
import * as Api from 'api/api'
import { checkMetaMask, checkChainId } from '../utils'

export const useSmartContract = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const displayNotification = (notification) => {
    dispatch(showNotification(notification))
  }

  const handleSubmitMetaMask = async ({
    smartContractCall,
    transactionType,
    transactionSummary,
    apiCall
  }) => {
    if (!checkMetaMask(displayNotification)) {
      return Promise.reject()
    }
    try {
      setLoading(true)
      await checkChainId()

      const walletAddress = localStorage.getItem('walletAddress')
      let transactionId;
      const resultMetaMask = await smartContractCall
        .send({ from: walletAddress }, async (error, transactionHash) => {
          if (!error) {
            const result = await Api.post({
              url: '/transaction',
              data: {
                txhash: transactionHash,
                type: transactionType,
                summary: transactionSummary,
                from: walletAddress
              }
            })
            transactionId = result.data.transaction_id
          }
        })
      // const resultMetaMask = { transactionHash: '1234' }
      const result = await apiCall(resultMetaMask.transactionHash)
      if (transactionId) {
        Api.put({
          url: '/transaction',
          data: {
            transaction_id: transactionId,
            block_hash: resultMetaMask.blockHash,
            block_number: resultMetaMask.blockNumber,
            status: resultMetaMask.status ? 1 : 0
          }
        })
      }

      setLoading(false)
      return result
    } catch (e) {
      console.log('error', e)
      setLoading(false)
      return Promise.reject(e)
    }
  }

  return [loading, handleSubmitMetaMask]
}
