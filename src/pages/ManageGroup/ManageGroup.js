import React, { useEffect, useState, useMemo } from 'react'

import GooglePaging from 'components/GooglePaging'
import { GROUP_STATUS_SELECT,
  GROUP_STATUS_OBJ,
} from 'utils/constants'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { useDispatch, useSelector } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { convertSearchParamsToObject, convertObjectToSearchParams } from 'utils/utils'
import history from 'utils/history'
import { handleShowConfirm } from 'layout/CommonLayout/actions'
import classes from './ManageGroup.module.scss'
import TableData from './components/TableData'
import Header from './components/Header'
import reducer, {
  getBiddingGroups,
  getInvitingGroups,
  changeStatus
} from './Slices'
import saga from './saga'
import { makeSelectBiddingGroupsData, makeSelectInvitingGroupsData } from './selectors'

const mapStateToProps = createStructuredSelector({
  biddingGroupsData: makeSelectBiddingGroupsData(),
  invitingGroupsData: makeSelectInvitingGroupsData()
})

const ManageGroup = ({ location, entityType }) => {
  const userInfo = useMemo(() => JSON.parse(localStorage.getItem('userInfo')), [])
  const viewOnly = useMemo(() => {
    const roleType = userInfo?.userMapping?.roleType
    return roleType !== 'PROFILE' && roleType !== 'OWNER'
  }, [])
  const [searchObj, setSearchObj] = useState({})

  useInjectReducer({ key: 'group', reducer })
  useInjectSaga({ key: 'group', saga })

  const dispatch = useDispatch()

  const { biddingGroupsData, invitingGroupsData } = useSelector(mapStateToProps)

  useEffect(() => {
    const query = convertSearchParamsToObject(location.search)
    setSearchObj({
      ...query,
      textSearch: query.textSearch && decodeURIComponent(query.textSearch),
      status: query.status && {
        label: GROUP_STATUS_OBJ[query.status],
        value: query.status
      }
    })
    if (entityType === 'BIDDING') {
      dispatch(getBiddingGroups(query))
    } else {
      dispatch(getInvitingGroups(query))
    }
  }, [location.search, location.pathname])

  const handleSearch = (searchObj) => {
    history.replace({
      pathname: location.pathname,
      search: convertObjectToSearchParams({
        ...searchObj,
        status: searchObj.status && searchObj.status.value,
        page: 1
      })
    })
  }

  const handleChangePage = ({ page }) => {
    const query = convertSearchParamsToObject(location.search)
    history.replace({
      pathname: location.pathname,
      search: convertObjectToSearchParams({
        ...query,
        page
      })
    })
  }

  const handleChangeStatus = (status, entity) => {
    const query = convertSearchParamsToObject(location.search)
    dispatch(handleShowConfirm({
      title: 'Confirm',
      description: 'Do you want change status?',
      handleOk: () => {
        dispatch(changeStatus({ status, entity, query, entityType }))
      }
    }))
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Header
          statuses={GROUP_STATUS_SELECT}
          searchObj={searchObj}
          handleSearch={handleSearch}
          totalDocs={entityType === 'BIDDING' ? biddingGroupsData.totalDocs : invitingGroupsData.totalDocs}
        />
      </div>

      <div className={classes.content}>
        <TableData
          data={entityType === 'BIDDING' ? biddingGroupsData.docs : invitingGroupsData.docs}
          handleChangeStatus={handleChangeStatus}
          viewOnly={viewOnly}
          userInfo={userInfo}
        />
        <GooglePaging
          pageInfo={{
            page: entityType === 'BIDDING' ? biddingGroupsData.page : invitingGroupsData.page,
            totalPages: entityType === 'BIDDING' ? biddingGroupsData.totalPages : invitingGroupsData.totalPages,
          }}
          changePage={handleChangePage}
        />
      </div>

    </div>
  )
}

export default ManageGroup
