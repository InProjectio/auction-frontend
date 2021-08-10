import React from 'react'
import { BIDDERS_OBJ, BIDDERS_METHODS_OBJ } from 'utils/constants'
import FileType from 'components/DropzoneUploader/FileType'
import history from 'utils/history'
import defaultCompanyLogo from 'images/defaultLogoCompany.jpg'
import { Link } from 'react-router-dom'
import { getFileName } from 'utils/utils'
import moment from 'moment'
import classes from './PackageInfo.module.scss'

const PackageInfo = ({ detail, setShowSelectBidder, winner, userInfo }) => (
  <div
    className={classes.container}
  >
    <div className={classes.left}>
      <div className={classes.wrapper}>

        <p className={classes.title}>
          Basic information
        </p>
        <div className={classes.box}>
          <p className={classes.label}>
            Package name
          </p>
          <div className={classes.value}>
            { detail.packageName }
          </div>

          <p className={classes.label}>
            Procurement plan
          </p>
          <div className={classes.value}>
            { detail.procurementPlan }
          </div>

          <p className={classes.label}>
            Offeree
          </p>
          <div className={classes.value}>
            { detail.offeree?.entityName }
          </div>

          <p className={classes.label}>
            Project
          </p>
          <div className={classes.value}>
            { detail.projectName }
          </div>

          <div className={classes.row}>
            <div className={classes.col}>
              <p className={classes.label}>
                Fields
              </p>
              <div className={classes.value}>
                { detail.field }
              </div>
            </div>
            <div className={classes.col}>
              <p className={classes.label}>
                Contract type
              </p>
              <div className={classes.value}>
                { detail.contractType }
              </div>

            </div>
            <div className={classes.col}>
              <p className={classes.label}>
                Funding source
              </p>
              <div className={classes.value}>
                { detail.foundingSource }
              </div>
            </div>
          </div>

          <div className={classes.row}>
            <div className={classes.col}>
              <p className={classes.label}>
                Selection of Bidders
              </p>
              <div className={classes.value}>
                { BIDDERS_OBJ[detail.biddingType] }
              </div>
            </div>

          </div>

          <div className={classes.row}>
            <div className={classes.col}>
              <p className={classes.label}>
                Publication time
              </p>
              <div className={classes.value}>
                { moment(detail.publicTime).format('MMMM DD, YYYY HH:mm') }
              </div>
            </div>
            <div className={classes.col}>
              <p className={classes.label}>
                Bidders selection method
              </p>
              <div className={classes.value}>
                { BIDDERS_METHODS_OBJ[detail.biddingMethod] }
              </div>
            </div>
            <div className={classes.col}>
              <p className={classes.label}>
                Duration of contract
              </p>
              <div className={classes.value}>
                { moment(detail.fromContractDate).format('MMMM DD, YYYY') }
                {' '}
                -
                {' '}
                {moment(detail.toContractDate).format('MMMM DD, YYYY')}
              </div>

            </div>
          </div>
        </div>

        <p className={classes.title}>
          Participate in the bid
        </p>
        <div className={classes.box}>
          <div className={classes.row}>
            <div className={classes.col}>
              <p className={classes.label}>
                Time to receive bids
              </p>
              <div className={classes.value}>
                { moment(detail.fromReceiveDate).format('MMMM DD, YYYY HH:mm') }
                {' '}
                -
                {' '}
                {moment(detail.toReceiveDate).format('MMMM DD, YYYY HH:mm')}
              </div>

            </div>
            <div className={classes.col}>
              <p className={classes.label}>
                Bids validity
              </p>
              <div className={classes.value}>
                { detail.validityDay }
                {' '}
                days
              </div>
            </div>
            <div className={classes.col}>
              <p className={classes.label}>
                Issuance fee
              </p>
              <div className={classes.value}>
                { detail.insuranceFee }
                {' '}
                $
              </div>
            </div>
          </div>
          <p className={classes.label}>
            Location to receive bids
          </p>
          <div className={classes.value}>
            { detail.receiveBidLocation }
          </div>

          <p className={classes.label}>
            Work place
          </p>
          <div className={classes.value}>
            { detail.workplace }
          </div>
        </div>

        <p className={classes.title}>
          Bid opening
        </p>
        <div className={classes.box}>
          <div className={classes.row}>
            <div className={classes.col}>
              <p className={classes.label}>
                Bid estimate
              </p>
              <div className={classes.value}>
                { detail.estimate }
              </div>
            </div>
          </div>
          <p className={classes.label}>
            Bid opening location
          </p>
          <div className={classes.value}>
            { detail.openLocation }
          </div>
        </div>

        <p className={classes.title}>
          Package
        </p>
        <div className={classes.box}>
          { detail.documentAttackFiles && detail.documentAttackFiles.length > 0
          && (
          <>
            <p className={classes.label}>
              Bidding documents
            </p>
            <div className={classes.value}>
              { detail.documentAttackFiles.map((item, i) => (
                <div key={i} className={classes.attachment}>
                  <FileType item={{ url: item }} size="sm" />
                  <a
                    className={classes.link}
                    onClick={() => {
                      window.open(item)
                    }}
                  >
                    { getFileName(item)}
                  </a>
                </div>
              )) }
            </div>

          </>
          )}

          { detail.packagesRelation && detail.packagesRelation.length > 0
            && (
            <>
              <p className={classes.label}>
                Related packages
              </p>
              <div className={classes.value}>
                { detail.packagesRelation.map((item, i) => (
                  <div key={i} className={classes.package}>
                    <Link
                      className={classes.link}
                      target="_blank"
                      to={`/package-detail/${item?._id}`}
                    >
                      { item?.packageName }
                    </Link>
                  </div>
                )) }
              </div>
            </>
            )}
        </div>

        { detail.content
        && (
        <>
          <p className={classes.title}>
            Description
          </p>
          <div
            className={classes.valueNormal}
            dangerouslySetInnerHTML={{ __html: detail.content }}
          />
        </>
        )}

      </div>
    </div>

    <div className={classes.right}>
      <p className={classes.label}>
        Contractors
      </p>
      { winner
        ? (
          <div
            className={classes.entity}
            key={winner._id}
            onClick={() => {
              history.push(`/entity-detail/${winner.entity._id}`)
            }}
          >
            <div className={classes.logoWrapper}>
              <img className={classes.logo} alt="logo" src={winner.entity?.company?.logo || defaultCompanyLogo} />
            </div>

            <div className={classes.info}>
              <p className={classes.entityName}>
                { winner.entity?.entityName }
              </p>
              <p className={classes.company}>
                {winner.entity?.company?.companyName}
              </p>
            </div>

          </div>
        )
        : (
          <>
            <div className={classes.entity}>
              <div className={classes.emptyLogo}>
                ?
              </div>
              <p className={classes.notPublic}>
                Not public yet
              </p>
            </div>
            { userInfo?.userMapping?._id === detail.userCreated
              && (
              <a
                className="btn btnSecond btnSmall mb24"
                onClick={() => setShowSelectBidder(true)}
              >
                Update
              </a>
              )}

          </>
        )}
      <p className={classes.label}>
        Bidders
      </p>
      { detail.biddings && detail.biddings.length > 0
        ? (
          <>
            { detail.biddings.map((item) => (
              <div
                className={classes.entity}
                key={item._id}
                onClick={() => {
                  history.push(`/entity-detail/${item.entity._id}`)
                }}
              >
                <div className={classes.logoWrapper}>
                  <img className={classes.logo} alt="logo" src={item.entity?.company?.logo || defaultCompanyLogo} />
                </div>

                <div className={classes.info}>
                  <p className={classes.entityName}>
                    { item.entity?.entityName }
                  </p>
                  <p className={classes.company}>
                    {item.entity?.company?.companyName}
                  </p>
                </div>

              </div>
            )) }
          </>
        )
        : (
          <p className={classes.empty}>
            Don&apos;t have any bidders
          </p>
        )}

    </div>
  </div>
)

export default PackageInfo
