import React, { useEffect, useState } from 'react'
import * as Api from 'api/api'
import ButtonBack from 'components/ButtonBack'
import history from 'utils/history'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import FileType from 'components/DropzoneUploader/FileType'
import defaultAvatar from 'images/defaultAvatar.svg'
import classNames from 'classnames'
import defaultCompanyLogo from 'images/defaultLogoCompany.jpg'
import { getFileName } from 'utils/utils'
import classes from './EntityDetail.module.scss'

const EntityDetail = ({ match }) => {
  const [detail, setDetail] = useState({})
  const getEntityDetail = async () => {
    const entityId = match.params.entityId
    try {
      const result = await Api.auction.get({
        url: '/api/company/entity/find-entity-detail',
        params: {
          entityId
        }
      })
      console.log('data===>', result.data)
      setDetail(result.data)
    } catch (e) {
      Promise.reject(e)
    }
  }
  useEffect(() => {
    getEntityDetail()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <ButtonBack onClick={() => {
          history.goBack()
        }}
        />
        <div className={classes.box}>
          <div className={classes.left}>
            <div className={classes.head}>
              { detail.entityName }
            </div>
            <div className={classes.wrapper}>
              <div className={classes.row}>
                <div className={classes.logoWrapper}>
                  <img src={detail.company?.logo || defaultCompanyLogo} className={classes.logo} alt="logo" />
                </div>
                <p className={classes.companyName}>
                  { detail.company?.companyName }
                </p>
              </div>
              <p className={classes.label}>
                Entity name:
              </p>
              <p className={classes.value}>
                { detail.entityName }
              </p>
              <p className={classes.label}>
                Type:
              </p>
              <p className={classes.value}>
                { detail.entityType === 'BIDDING' ? 'Bidding' : 'Offeree' }
              </p>
              <p className={classes.label}>
                Created at:
              </p>
              <p className={classes.value}>
                { moment(detail.createdAt).format('MM/DD/YYYY HH:mm') }
              </p>
              <p className={classes.label}>
                Documents:
              </p>
              { detail.attackFiles && detail.attackFiles.map((item, i) => (
                <div key={i} className={classes.attachment}>
                  <FileType item={{ url: item }} size="sm" />
                  <a
                    className={classes.link}
                    onClick={() => {
                      window.open(item)
                    }}
                  >
                    { getFileName(item) }
                  </a>
                </div>
              )) }
              <p className={classNames(classes.label, classes.mt40)}>
                Description:
              </p>
              <p
                className={classes.description}
                dangerouslySetInnerHTML={{ __html: detail.content }}
              />

              <p className={classes.title}>
                Company
              </p>
              <div className={classes.row}>
                <div className={classes.col}>
                  <p className={classes.label}>
                    Company name
                  </p>
                  <p className={classes.value}>
                    { detail?.company?.companyName }
                  </p>
                </div>
                <div className={classes.col}>
                  <p className={classes.label}>
                    Short name
                  </p>
                  <p className={classes.value}>
                    { detail?.company?.shortName }
                  </p>
                </div>
                <div className={classes.col}>
                  <p className={classes.label}>
                    International company name
                  </p>
                  <p className={classes.value}>
                    { detail?.company?.nationalName }
                  </p>
                </div>
              </div>

              <div className={classes.row}>
                <div className={classes.col}>
                  <p className={classes.label}>
                    Type of business
                  </p>
                  <p className={classes.value}>
                    { detail?.company?.businessType }
                  </p>
                </div>
                <div className={classes.col}>
                  <p className={classes.label}>
                    Tax code
                  </p>
                  <p className={classes.value}>
                    { detail?.company?.taxCode }
                  </p>
                </div>
                <div className={classes.col}>
                  <p className={classes.label}>
                    Fax
                  </p>
                  <p className={classes.value}>
                    { detail?.company?.fax }
                  </p>
                </div>
              </div>

              <div className={classes.row}>
                <div className={classes.col}>
                  <p className={classes.label}>
                    Phone number
                  </p>
                  <a
                    className={classes.value}
                    href={detail?.company?.phone ? `tel:${detail?.company?.phone}` : '#'}
                  >
                    { detail?.company?.phone }
                  </a>
                </div>
                <div className={classes.col}>
                  <p className={classes.label}>
                    Email address
                  </p>
                  <a
                    className={classes.value}
                    href={detail?.company?.email ? `mailTo:${detail?.company.email}` : '#'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    { detail?.company?.email }
                  </a>
                </div>
                <div className={classes.col}>
                  <p className={classes.label}>
                    Website
                  </p>
                  <a
                    className={classes.value}
                    href={detail?.company?.website || '#'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    { detail?.company?.website }
                  </a>
                </div>
              </div>

              <div className={classes.row}>
                <div className={classes.col}>
                  <p className={classes.label}>
                    Founding
                  </p>
                  <p className={classes.value}>
                    { detail?.company?.founding }
                  </p>
                </div>
                <div className={classes.col2}>
                  <p className={classes.label}>
                    Number employees
                  </p>
                  <p className={classes.value}>
                    { detail?.company?.numEmployee }
                  </p>
                </div>
              </div>
              <div className={classes.row}>
                <div className={classes.col}>
                  <p className={classes.label}>
                    Representative name
                  </p>
                  <p className={classes.value}>
                    { detail?.company?.representName }
                  </p>
                </div>
                <div className={classes.col}>
                  <p className={classes.label}>

                    Representative position
                  </p>
                  <p className={classes.value}>
                    { detail?.company?.representPosition }
                  </p>
                </div>
                <div className={classes.col}>
                  <p className={classes.label}>
                    Representative address
                  </p>
                  <p className={classes.value}>
                    { detail?.company?.representAddress }
                  </p>
                </div>
              </div>

              <p className={classes.label}>
                Address by Business Registration
              </p>
              <p className={classes.value}>
                { detail?.company?.registrationAddress }
              </p>
              <p className={classes.label}>
                Trading address
              </p>
              <p className={classes.value}>
                { detail?.company?.tradingAddress }
              </p>
              <p className={classes.label}>
                Careers
              </p>
              <p className={classes.value}>
                <ul>
                  { detail?.company?.careers?.map((career) => (
                    <li>
                      {career}
                    </li>
                  )) }
                </ul>

              </p>
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.rowBetween}>
              <p className={classes.title}>
                <FormattedMessage
                  id="memberList"
                  defaultMessage="Member list"
                />
              </p>
              <p className={classes.totalMembers}>
                <FormattedMessage
                  id="totalMembers"
                  defaultMessage="Total: {numberMembers} member(s)"
                  values={{
                    numberMembers: detail.userMaps?.length
                  }}
                />
              </p>
            </div>

            { detail.userMaps
              && detail.userMaps.map((item) => (
                <div
                  className={classes.user}
                  key={item._id}
                >
                  <img src={item.user?.avatar_url || defaultAvatar} className={classes.avatar} alt="avatar" />
                  <div className={classes.info}>
                    <p className={classes.fullName}>
                      { item.user?.fullname }
                    </p>
                    <p className={classes.email}>
                      { item.user?.email }
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntityDetail
