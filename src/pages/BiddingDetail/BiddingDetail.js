import React, { useState, useMemo, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import caretIcon from 'images/caret.svg'
import editIcon from 'images/edit-info-white.svg'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'react-bootstrap'
import SubmitBidding from 'components/SubmitBidding'
import classes from './BiddingDetail.module.scss'
import PackageDetail from './PackageDetail'

const BiddingDetail = ({ match, type }) => {
  const [showRegisterBidder, setShowRegisterBidder] = useState(false)
  const detailRef = useRef(null)
  const companyId = useMemo(() => localStorage.getItem('companyId'), [])

  const [detail, setDetail] = useState({})

  const handleRefershPackageDetail = () => {
    detailRef.current?.getPackageDetail()
  }

  // console.log('detail', detail)

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.rowBetween}>
          <div className={classes.pageInfo}>
            <NavLink
              to="/market-place"
              className={classes.link}
            >
              Marketplace
            </NavLink>
            <img src={caretIcon} className={classes.caretIcon} alt="caret" />
            <p className={classes.packageName}>
              {detail?.packageName}
            </p>
          </div>
          { type === 'OFFEREE'
            ? (
              <Link
                to={`/company/auction/form/${match.params.packageId}`}
                className="btn btnMain"
              >
                <img src={editIcon} className={classes.editIcon} alt="edit" />
                <FormattedMessage
                  id="editPackage"
                  defaultMessage="Edit package"
                />
              </Link>
            )
            : (
              <>
                { companyId
              && (
                <a
                  className="btn btnMain"
                  onClick={() => setShowRegisterBidder(true)}
                >
                  <FormattedMessage
                    id="submit"
                    defaultMessage="Submit"
                  />
                </a>
              )}
              </>
            )}

        </div>

        <PackageDetail
          handleSetDetail={setDetail}
          packageId={match.params.packageId}
          type={type}
          ref={detailRef}
        />

        <Modal
          show={showRegisterBidder}
          onHide={() => { setShowRegisterBidder(false) }}
        >
          <SubmitBidding
            handleClose={() => { setShowRegisterBidder(false) }}
            packageId={match.params.packageId}
            handleRefershPackageDetail={handleRefershPackageDetail}
            initialValues={{
              minDate: detail?.fromContractDate
            }}
          />
        </Modal>
      </div>
    </div>
  )
}

export default BiddingDetail
