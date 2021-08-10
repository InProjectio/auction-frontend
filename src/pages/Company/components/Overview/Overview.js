import React, { useRef, useState } from 'react'
import cameraIcon from 'images/camera.svg'
import bidIcon from 'images/bid.svg'
import nextIcon from 'images/next.svg'
import CompanyStatus from 'components/CompanyStatus'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import * as Api from 'api/api'
import S3 from 'react-aws-s3'
import Loader from 'react-loader-spinner'
import { useDispatch } from 'react-redux'
import { change } from 'redux-form'
import moment from 'moment'
import history from 'utils/history'
import classes from './Overview.module.scss'

const Overview = ({ company = {}, setLogo }) => {
  const dispatch = useDispatch()
  const fileInput = useRef(null)
  const [loading, setLoading] = useState(false)

  const handleUploadPhoto = async (e) => {
    try {
      setLoading(true)

      const file = e.target.files[0]
      if (!file) {
        return
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        try {
          fileInput.current.value = ''
          const config = {
            bucketName: process.env.REACT_APP_BUCKET_NAME,
            dirName: '', /* optional */
            region: process.env.REACT_APP_REGION,
            accessKeyId: process.env.REACT_APP_ACCESS_ID,
            secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
          };
          const ReactS3Client = new S3(config)
          const result = await ReactS3Client.uploadFile(file, `${moment().unix()}---${file.name}`)
          if (company._id) {
            await Api.auction.post({
              url: '/api/company/save-company',
              data: {
                logo: result.location,
                companyId: company._id
              }
            })
            setLogo(result.location)
          } else {
            dispatch(change('RegisterCompany', 'logo', result.location))
          }

          setLoading(false)
        } catch (e) {
          setLoading(false)
        }
      };
    } catch (e) {
      setLoading(false)
    }
  }
  return (
    <div className={classes.container}>
      <div className={classes.banner}>
        { loading
          && (
          <div className={classes.loader}>
            <Loader type="Oval" color="#7B68EE" height={40} width={40} />
          </div>
          )}
        { company.logo
          && (
          <div className={classes.logoWrapper}>
            <img src={company.logo} className={classes.logo} alt="logo" />
          </div>
          )}

        <div
          className={classes.cameraWrapper}
          onClick={() => fileInput.current.click()}
        >
          <img src={cameraIcon} className={classes.cameraIcon} alt="icon" />
        </div>
        <input
          type="file"
          className={classes.file}
          ref={fileInput}
          onChange={handleUploadPhoto}
          accept="image/x-png,image/jpg,image/jpeg"
        />
      </div>
      <div className={classes.content}>
        <p className={classes.companyName}>
          { company.companyName || 'Company Name' }
        </p>
        <p className={classes.internationalName}>
          { company.nationalName || 'International Name' }
        </p>
        { company._id
        && (
        <div className={classes.status}>
          <CompanyStatus status={company.status} />
        </div>
        )}
        { company._id
        && (
        <div
          className={classes.numberbiddings}
          onClick={() => {
            history.push('/company/auction/bidding-history?status=ACCEPT&page=1')
          }}
        >
          <div className={classes.iconWrapper}>
            <img src={bidIcon} className={classes.bidIcon} alt="icon" />
          </div>
          <div className={classes.info}>
            <p className={classes.numberBiddings}>
              { company.totalPackageSucess }
            </p>
            <p className={classes.numberBidingLabel}>
              <FormattedMessage
                id="Overview.bidingSuccess"
                defaultMessage="Bidding success"
              />
            </p>
          </div>
          <img src={nextIcon} className={classes.nextIcon} alt="icon" />
        </div>
        )}
        <div className={classes.infoWrapper}>
          <p className={classes.label}>
            <FormattedMessage
              id="Overview.businessType"
              defaultMessage="Type of business"
            />
          </p>
          <p className={classes.value}>
            { company.businessType || 'No Information' }
          </p>

          <p className={classes.label}>
            <FormattedMessage
              id="Overview.taxCode"
              defaultMessage="Tax code"
            />
          </p>
          <p className={classes.value}>
            { company.taxCode || 'No Information'}
          </p>
          <p className={classes.label}>
            <FormattedMessage
              id="Overview.phoneNumber"
              defaultMessage="Phone Number"
            />
          </p>
          <a
            className={classes.value}
            href={company.phone ? `tel:${company.phone}` : '#'}
          >
            { company.phone || 'No Information' }
          </a>
          <p className={classes.label}>
            <FormattedMessage
              id="Overview.email"
              defaultMessage="Email"
            />
          </p>
          <a
            className={classNames(classes.value, classes.link)}
            href={company.email ? `mailTo:${company.email}` : '#'}
            target="_blank"
            rel="noreferrer"
          >
            { company.email || 'No Information' }
          </a>
          <p className={classes.label}>
            <FormattedMessage
              id="Overview.website"
              defaultMessage="Website"
            />
          </p>
          <a
            className={classNames(classes.value, classes.link)}
            href={company.website || '#'}
            target="_blank"
            rel="noreferrer"
          >
            { company.website || 'No Information' }
          </a>
          <p className={classes.label}>
            <FormattedMessage
              id="Overview.representative"
              defaultMessage="Representative"
            />
          </p>
          <p className={classes.value}>
            { company.representName || 'No Information' }
          </p>
        </div>

      </div>
    </div>
  )
}

export default Overview
