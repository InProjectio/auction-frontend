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
import { PACKAGE_STATUS, PACKAGE_STATUS_COMPLETE, PACKAGE_STATUS_OBJ } from 'utils/constants'
import Header from './components/Header'
import List from './components/List'
import classes from './ManagementPackage.module.scss'
import saga from './saga'
import reducer, {
  getInvitingPackages,
  getCompletePackages,
  getEntities
} from './Slices'
import {
  makeSelectInvitingPackagesData,
  makeSelectCompletePackagesData,
  makeSelectEntities
} from './selectors'

const mapStateToProps = createStructuredSelector({
  invitingPackagesData: makeSelectInvitingPackagesData(),
  completePackagesData: makeSelectCompletePackagesData(),
  entities: makeSelectEntities()
})

const ManagementPackage = ({ type, location }) => {
  useInjectReducer({ key: 'managePackages', reducer })
  useInjectSaga({ key: 'managePackages', saga })

  const [searchObj, setSearchObj] = useState({})

  const dispatch = useDispatch()

  const {
    invitingPackagesData,
    completePackagesData,
    entities
  } = useSelector(mapStateToProps)

  const getData = () => {
    const query = convertSearchParamsToObject(location.search)
    if (type === 'INVITING') {
      dispatch(getInvitingPackages(query))
    } else if (type === 'HISTORY') {
      dispatch(getCompletePackages(query))
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
        label: PACKAGE_STATUS_OBJ[query.status],
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
      entity: query.entity && {
        label: entitiesObj[query.entity]?.label,
        value: query.entity
      },
      status: query.status && {
        label: PACKAGE_STATUS_OBJ[query.status],
        value: query.status
      }
    })
    getData()
  }, [location.search, location.pathname])

  const handleSearch = (searchObj) => {
    history.replace({
      pathname: location.pathname,
      search: convertObjectToSearchParams({
        ...searchObj,
        entity: searchObj.entity?.value,
        page: 1,
        status: searchObj.status?.value
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

  const packagesData = useMemo(() => {
    if (type === 'INVITING') {
      return invitingPackagesData
    }
    if (type === 'HISTORY') {
      return completePackagesData
    }
  }, [invitingPackagesData, completePackagesData])

  return (
    <div className={classes.container}>
      <div className={classes.container}>
        <div className={classes.header}>
          <Header
            searchObj={searchObj}
            handleSearch={handleSearch}
            entities={entities}
            statuses={type === 'HISTORY' ? PACKAGE_STATUS_COMPLETE : PACKAGE_STATUS}
            totalDocs={packagesData.totalDocs}
          />
        </div>
        { packagesData?.docs?.length > 0
          ? (
            <div className={classes.content}>
              <List
                data={packagesData?.docs}
              />

              <GooglePaging
                pageInfo={{
                  page: packagesData.page,
                  totalPages: packagesData.totalPages
                }}
                changePage={handleChangePage}
              />
            </div>
          )
          : (
            <p className={classes.empty}>
              Don&apos;t have offeree
            </p>
          )}
      </div>

    </div>
  )
}

export default ManagementPackage
