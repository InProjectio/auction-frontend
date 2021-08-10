import React from 'react'
import SearchComponent from 'components/SearchComponent'
import classNames from 'classnames'
import classes from './Header.module.scss'

const Header = ({ searchObj, handleSearch }) => (
  <div>
    <div className={classes.container}>
      <div className={classNames(classes.row, classes.between)}>
        <div className={classNames(classes.text)}>
          <SearchComponent
            value={searchObj.textSearch || ''}
            handleSearch={(textSearch) => {
              handleSearch({ ...searchObj, textSearch })
            }}
            customClass={classes.customSearch}
            btnClass={classes.btnSearch}
          />
        </div>
      </div>
    </div>
  </div>
)

export default Header
