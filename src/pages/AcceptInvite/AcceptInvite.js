import React, { useState, useEffect } from 'react'
import * as Api from 'api/api'
import Button from 'components/Button'
import classNames from 'classnames'
import history from 'utils/history'
import invited from 'images/invited.svg'
import * as storage from 'utils/storage'
import smartContractCompany from 'utils/smartContract/company'
import { useSmartContract } from 'utils/smartContract/hooks'
import { convertSmartContractData } from 'utils/utils'
import classes from './AcceptInvite.module.scss'

const AcceptInvite = ({ match }) => {
  const [loading, handleSubmitMetaMask] = useSmartContract()

  const [company, setCompany] = useState({})

  useEffect(async () => {
    try {
      const result = await Api.auction.get({
        url: '/api/company/find-detail-by-token',
        params: {
          token: match.params.token
        }
      })

      console.log('data ===>', result.data)

      setCompany(result.data)
    } catch (e) {
      console.log(e)
    }
  }, [])

  const handleActiveUser = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))

      const result = await handleSubmitMetaMask({
        transactionType: 'UPDATE',
        transactionSummary: 'Accept invitation',
        apiCall: () => Api.auction.post({
          url: '/api/company/user-mapping/active-user-invite',
          data: {
            token: match.params.token
          }
        }),
        smartContractCall: smartContractCompany.methods.newMemberInCompany(
          company?.data._id,
          company?.userMapping?._id,
          company?.userMapping?.position,
          company?.userMapping?.roleType,
          company?.userMapping?._id,
          convertSmartContractData({
            ...company?.userMapping,
            status: 'ACTIVE',
            state: 'ACCEPT'
          }),
          userInfo.user_id
        )
      })

      localStorage.setItem('companyId', company?.data?._id)
      storage.setItem('companyId', company?.data?._id)

      const newUserInfo = JSON.stringify({
        ...userInfo,
        userMapping: result.data
      })

      localStorage.setItem('userInfo', newUserInfo)
      storage.setItem('userInfo', newUserInfo)

      history.push('/company')
    } catch (e) {
      Promise.reject(e)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <img src={invited} className={classes.invited} alt="invited" />
        <h2 className={classes.title}>
          Hello. You’re invited to
          {' '}
          { company?.data?.companyName }
        </h2>
        <Button
          className={classNames('btn btnMain btnLarge', classes.center)}
          loading={loading}
          onClick={handleActiveUser}
        >
          Join this company
        </Button>
      </div>
    </div>
  )
}

export default AcceptInvite
