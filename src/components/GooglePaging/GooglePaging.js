import React, { Component } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loader-spinner'
import classes from './GooglePaging.module.scss'

export default class GooglePaging extends Component {
  changePage = (page) => () => {
    const { changePage } = this.props
    if (changePage) {
      changePage({ page })
    }
  }

  renderPage = (currentPage, totalPages) => {
    let startPage
    let endPage
    const pages = []
    if (totalPages <= 10) {
      startPage = 1
      endPage = totalPages
    } else if (currentPage <= 6) {
      startPage = 1
      endPage = 10
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9
      endPage = totalPages
    } else {
      startPage = currentPage - 5
      endPage = currentPage + 4
    }

    for (let i = startPage; i <= endPage; i += 1) {
      pages.push(
        <span
          className={classNames(i === currentPage ? classes.active : '', classes.pageNumber)}
          onClick={this.changePage(i)}
          key={i}
        >
          {i}
        </span>
      )
    }

    return pages
  }

  render() {
    const { pageInfo, loading, hidePageInfo } = this.props
    const { page, totalPages } = pageInfo
    return (
      <>
        { pageInfo && pageInfo.totalPages > 1
          ? (
            <div className={classes.pagingWrapper}>
              <div className={classes.left}>
                { !hidePageInfo && (
                <div className={classes.currentPerTotal}>
                  {' '}
                  {page}
                  /
                  {totalPages}
                  {' '}
                </div>
                )}
                { loading && (
                <div className={classes.loader}>
                  <Loader type="Oval" color="rgba(31, 125, 161, 0.5)" height={20} width={20} />
                </div>
                )}
              </div>

              <div className={classes.page}>
                { +page !== 1
                && (
                <a
                  className={classes.btnLeft}
                  onClick={this.changePage(+page - 1)}
                >
                  <FontAwesomeIcon icon={faChevronLeft} className={classes.icon} />
                </a>
                )}
                {this.renderPage(+page, +totalPages)}
                { page < totalPages
                && (
                <a
                  className={classes.btnRight}
                  onClick={this.changePage(+page + 1)}
                >
                  <FontAwesomeIcon icon={faChevronRight} className={classes.icon} />
                </a>
                )}
              &nbsp;
              </div>
            </div>
          ) : <div />}
      </>

    )
  }
}

GooglePaging.defaultProps = {
  pageInfo: {
    page: 1,
    totalPages: 1,
  },
}
