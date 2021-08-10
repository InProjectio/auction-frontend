import React, { useEffect, useState } from 'react'
import * as Api from 'api/api'
import Loader from 'react-loader-spinner'
import addIcon from 'images/plus-purple.svg'
import trashIcon from 'images/trash-purple.svg'
import editIcon from 'images/edit-purple.svg'
import checkIcon from 'images/check-icon-green.svg'
import failIcon from 'images/fail.svg'
import openLinkIcon from 'images/open-link.svg'
import moment from 'moment'
import web3 from 'utils/smartContract/web3'
import classes from './Transactions.module.scss'

let timeout = null

const ListTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [pageInfo, setPageInfo] = useState({})
  const [loading, setLoading] = useState(false)

  const getListTransactions = async (page) => {
    try {
      setLoading(true)
      const result = await Api.get({
        url: '/transaction/list',
        params: {
          page
        }
      })
      const pendingTransactions = result.data.docs.filter((item) => !item.block_hash)
      recheckTransactions(pendingTransactions)
      if (page === 1) {
        setTransactions(result.data.docs)
      } else {
        setTransactions((prevTransactions) => [...prevTransactions, ...result.data.docs])
      }

      setPageInfo({
        hasNext: result.data.hasNextPage,
        page: result.data.page
      })
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  const recheckTransactions = async (transactions) => {
    if (transactions && transactions.length === 0) {
      return
    }
    for (let i = 0; i < transactions.length; i += 1) {
      const transactionReceipt = await web3.eth.getTransactionReceipt(transactions[i].txhash)
      if (transactionReceipt) {
        setTransactions((prevTransactions) => prevTransactions.map((transaction) => {
          if (transactionReceipt.transactionHash === transaction.txhash) {
            return {
              ...transaction,
              block_hash: transactionReceipt.blockHash,
              block_number: transactionReceipt.blockNumber,
              status: transactionReceipt.status ? 1 : 0
            }
          }
          return transaction
        }))
        Api.put({
          url: '/transaction',
          data: {
            block_hash: transactionReceipt.blockHash,
            block_number: transactionReceipt.blockNumber,
            status: transactionReceipt.status ? 1 : 0,
            transaction_id: transactions[i].transaction_id
          }
        })
      }
    }

    timeout = setTimeout(() => {
      getListTransactions(1)
    }, 3000)
  }

  useEffect(() => {
    getListTransactions(1)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className={classes.container}>
      <p className={classes.title}>
        Lastest Transactions
      </p>

      { (transactions && transactions.length > 0) ? transactions.map((transaction) => (
        <div
          className={classes.transaction}
          key={transaction.transaction_id}
          onClick={() => {
            window.open(`https://testnet.bscscan.com/tx/${transaction.txhash}`)
          }}
        >
          <div className={classes.type}>
            { transaction.type === 'ADD' && <img src={addIcon} className={classes.addIcon} alt="icon" /> }
            { transaction.type === 'UPDATE' && <img src={editIcon} className={classes.addIcon} alt="icon" /> }
            { transaction.type === 'DELETE' && <img src={trashIcon} className={classes.addIcon} alt="icon" /> }
          </div>
          <div className={classes.summaryWrapper}>
            <p className={classes.summary}>
              { transaction.summary }
            </p>
            <img src={openLinkIcon} className={classes.openLinkIcon} alt="icon" />
          </div>
          <p className={classes.time}>
            { moment(transaction.update_at).format('DD/MM/YYYY HH:mm') }
          </p>
          { transaction.block_hash
            ? <img src={transaction.status === 1 ? checkIcon : failIcon} className={classes.icon} alt="icon" />
            : <Loader type="Oval" color="#7b68ee" height={16} width={16} />}
        </div>
      ))
        : (
          <p className={classes.empty}>
            You don&apos;t have any transactions
          </p>
        )}

      { loading
        && (
        <div className={classes.loading}>
          <Loader type="Oval" color="#7b68ee" height={24} width={24} />
        </div>
        )}

      { pageInfo?.hasNext
        && (
        <a
          className={classes.showMore}
          onClick={() => {
            getListTransactions(pageInfo.page + 1)
          }}
        >
          View more
        </a>
        )}

    </div>
  )
}

export default ListTransactions
