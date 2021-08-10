import React, { useEffect, useMemo, useState } from 'react'
import GooglePaging from 'components/GooglePaging'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { useSelector, useDispatch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  convertSearchParamsToObject,
  convertObjectToSearchParams
} from 'utils/utils'
import history from 'utils/history'
import { BIDDING_STATUS_OBJ } from 'utils/constants'
import { Modal } from 'react-bootstrap'
import SubmitBidding from 'components/SubmitBidding'
import Header from './components/Header'
import List from './components/List'
import classes from './BiddingManagement.module.scss'
import saga from './saga'
import reducer, {
  getBiddings,
  getBiddingsComplete,
  getEntities
} from './Slices'
import {
  makeSelectBiddingsData,
  makeSelectBiddingsCompleteData,
  makeSelectEntities
} from './selectors'

const mapStateToProps = createStructuredSelector({
  biddingsData: makeSelectBiddingsData(),
  biddingsCompleteData: makeSelectBiddingsCompleteData(),
  entities: makeSelectEntities()
})

const BiddingManagement = ({ type, location }) => {
  useInjectReducer({ key: 'biddingManagement', reducer })
  useInjectSaga({ key: 'biddingManagement', saga })

  const [searchObj, setSearchObj] = useState({})
  const [selectedBidding, setSelectedBidding] = useState(null)

  const dispatch = useDispatch()

  const {
    biddingsData,
    biddingsCompleteData,
    entities
  } = useSelector(mapStateToProps)

  const getData = () => {
    const query = convertSearchParamsToObject(location.search)
    if (type === 'BIDDING') {
      dispatch(getBiddings(query))
    } else if (type === 'HISTORY') {
      dispatch(getBiddingsComplete(query))
    }
  }

  const entitiesObj = useMemo(() => {
    const obj = {}
    entities.forEach((entity) => {
      obj[entity.value] = entity
    })
    return obj
  }, [entities])

  useEffect(() => {
    const query = convertSearchParamsToObject(location.search)
    // console.log('test ===>', query, entitiesObj)
    setSearchObj({
      ...query,
      textSearch: query.textSearch && decodeURIComponent(query.textSearch),
      entity: query.entity && {
        label: entitiesObj[query.entity]?.label,
        value: query.entity
      },
      status: query.status && {
        label: BIDDING_STATUS_OBJ[query.status],
        value: query.status
      }
    })
  }, [entities])

  useEffect(() => {
    dispatch(getEntities())
  }, [])

  useEffect(() => {
    const query = convertSearchParamsToObject(location.search)
    setSearchObj({
      ...query,
      textSearch: query.textSearch && decodeURIComponent(query.textSearch),
      status: query.status && {
        label: BIDDING_STATUS_OBJ[query.status],
        value: query.status
      },
      entity: query.entity && {
        label: entitiesObj[query.entity]?.label,
        value: query.entity
      },
    })
    getData()
  }, [location.search, location.pathname])

  const handleSearch = (searchObj) => {
    history.replace({
      pathname: location.pathname,
      search: convertObjectToSearchParams({
        ...searchObj,
        status: searchObj.status?.value,
        page: 1,
        entity: searchObj.entity?.value
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

  const data = useMemo(() => {
    if (type === 'BIDDING') {
      return biddingsData
    } if (type === 'HISTORY') {
      return biddingsCompleteData
    }
  }, [biddingsData, biddingsCompleteData])

  return (
    <div className={classes.container}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Header
            searchObj={searchObj}
            handleSearch={handleSearch}
            type={type}
            entities={entities}
            totalDocs={data.totalDocs}
          />
        </div>
        { data?.docs?.length > 0
          ? (
            <div className={classes.content}>
              <List
                data={data?.docs}
                setSelectedBidding={setSelectedBidding}
              />
              <GooglePaging
                pageInfo={{
                  page: data.page,
                  totalPages: data.totalPages
                }}
                changePage={handleChangePage}
              />
            </div>
          )
          : (
            <p className={classes.empty}>
              Don&apos;t have bidding
            </p>
          )}

      </div>
      <Modal
        show={!!selectedBidding}
        onHide={() => { setSelectedBidding(null) }}
      >
        <SubmitBidding
          handleClose={() => { setSelectedBidding(null) }}
          packageId={selectedBidding?.package?._id}
          handleRefershPackageDetail={getData}
          bidding={selectedBidding}
          initialValues={{
            entity: {
              value: selectedBidding?.entity?._id,
              label: selectedBidding?.entity?.entityName
            },
            date: {
              from: selectedBidding?.startDate,
              to: selectedBidding?.endDate,
            },
            cost: selectedBidding?.cost,
            attackFiles: selectedBidding?.attackFiles.map((item, i) => ({ id: i, url: item })),
            minDate: selectedBidding?.package?.fromContractDate
          }}
        />
      </Modal>
    </div>
  )
}

export default BiddingManagement
