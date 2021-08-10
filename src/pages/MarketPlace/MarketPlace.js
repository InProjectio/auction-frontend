import React, { useEffect, useState } from 'react'
import GooglePaging from 'components/GooglePaging'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { useSelector, useDispatch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  convertSearchParamsToObject,
  convertObjectToSearchParams
} from 'utils/utils'
import List from 'pages/ManagementPackage/components/List'
import history from 'utils/history'
import Header from './components/Header'
import classes from './MarketPlace.module.scss'
import saga from './saga'
import reducer, {
  getPackages,
} from './Slices'
import {
  makeSelectPackagesData
} from './selectors'

const mapStateToProps = createStructuredSelector({
  packagesData: makeSelectPackagesData(),
})

const MarketPlace = ({ location }) => {
  useInjectReducer({ key: 'marketPlace', reducer })
  useInjectSaga({ key: 'marketPlace', saga })

  const [searchObj, setSearchObj] = useState({})

  const dispatch = useDispatch()

  const {
    packagesData
  } = useSelector(mapStateToProps)

  const getData = () => {
    const query = convertSearchParamsToObject(location.search)
    dispatch(getPackages({
      ...query,
      textSearch: query.textSearch && decodeURIComponent(query.textSearch),
    }))
  }

  useEffect(() => {
    const query = convertSearchParamsToObject(location.search)
    setSearchObj({
      ...query,
      textSearch: query.textSearch && decodeURIComponent(query.textSearch),
    })
    getData()
  }, [location.search, location.pathname])

  const handleSearch = (searchObj) => {
    history.replace({
      pathname: location.pathname,
      search: convertObjectToSearchParams({
        ...searchObj,
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

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>
          <Header
            searchObj={searchObj}
            handleSearch={handleSearch}
          />
        </div>

        <div className={classes.wrapper}>
          { packagesData?.docs?.length > 0
            ? (
              <List
                data={packagesData?.docs}
                fromMarketPlace
              />
            )
            : (
              <p className={classes.empty}>
                Don&apos;t have any notification bidding
              </p>
            )}

          <GooglePaging
            pageInfo={{
              page: packagesData.page,
              totalPages: packagesData.totalPages
            }}
            changePage={handleChangePage}
          />
        </div>
      </div>

    </div>
  )
}

export default MarketPlace
