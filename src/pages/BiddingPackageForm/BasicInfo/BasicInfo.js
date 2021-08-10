import React, { useState, useEffect } from 'react'
import {
  Field,
  reduxForm
} from 'redux-form'
import InputField from 'components/InputField'
import SelectField from 'components/SelectField'
import { BIDDERS, BIDDERS_METHODS } from 'utils/constants'
import DatePickerField from 'components/DatePickerField'
import FormattedField from 'components/FormatedField'
import DatePickerFieldFormTo from 'components/DatePickerFormTo'
import Button from 'components/Button'
import * as Api from 'api/api'
import moment from 'moment'
import SelectProjectField from 'components/SelectProjectField'
import classes from './BasicInfo.module.scss'

const BasicInfo = ({ submitForm, handleSubmit, packageId, loading }) => {
  const [entities, setEntities] = useState([])
  const [loadingEntities, setLoadingEntities] = useState(false)

  const [projects, setProjects] = useState([])
  const [loadingProjects, setLoadingProjects] = useState(false)

  const getProjects = async () => {
    try {
      setLoadingProjects(true)

      const result = await Api.get({
        url: '/project/owner-projects',
      })

      setProjects(result.data)

      setLoadingProjects(false)
    } catch (e) {
      setLoadingProjects(false)
    }
  }

  const getEntities = async () => {
    try {
      setLoadingEntities(true)

      const result = await Api.auction.get({
        url: '/api/company/entity/find-entity',
        params: {
          companyId: localStorage.getItem('companyId'),
          state: 'TODO,PROCESS,DONE',
          entityType: 'TENDERER',
          status: 'ACTIVE',
          page: 1,
          pageSize: 1000
        }
      })

      setEntities((result.data.docs.map((item) => ({
        ...item,
        value: item._id,
        label: item.entityName
      }))))

      setLoadingEntities(false)
    } catch (e) {
      setLoadingEntities(false)
    }
  }

  useEffect(() => {
    getProjects()
    getEntities()
  }, [])

  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit(submitForm)}
    >
      <div className={classes.wrapper}>

        <p className={classes.title}>
          Basic information
        </p>

        <Field
          label="Package name"
          component={InputField}
          name="packageName"
        />

        <Field
          label="Procurement plan"
          component={InputField}
          name="procurementPlan"
        />

        <Field
          label="Offeree"
          component={SelectField}
          name="offeree"
          options={entities}
          loading={loadingEntities}
        />

        <Field
          label="Project"
          component={SelectProjectField}
          name="project"
          loading={loadingProjects}
          options={projects}
        />

        <div className={classes.row}>
          <div className={classes.col}>
            <Field
              label="Fields"
              component={InputField}
              name="field"
            />
          </div>
          <div className={classes.col}>
            <Field
              label="Contract Type"
              component={InputField}
              name="contractType"
            />
          </div>
          <div className={classes.col}>
            <Field
              label="Funding source"
              component={InputField}
              name="foundingSource"
            />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.col}>
            <Field
              label="Selection of Bidders"
              component={SelectField}
              name="biddingType"
              options={BIDDERS}
            />
          </div>
          <div className={classes.col}>
            <Field
              label="Bidders selection method"
              component={SelectField}
              name="biddingMethod"
              options={BIDDERS_METHODS}
            />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.col}>
            <Field
              label="Publication time"
              component={DatePickerField}
              name="publicTime"
              timeFormat="HH:mm"
              viewMode="days"
              placeholder="MM/DD/YYYY HH:mm"
            />
          </div>
          <div className={classes.col2}>
            <Field
              label="Duration of contract"
              component={DatePickerFieldFormTo}
              name="durationOfContractFrom"
              placeholder="Form date (MM/DD/YYYY)"
              viewMode="days"
            />
          </div>
        </div>
        <p className={classes.title}>
          Participate in the bid
        </p>
        <div className={classes.row}>
          <div className={classes.col2}>
            <Field
              label="Time to receive bids"
              component={DatePickerFieldFormTo}
              name="timeReceiveBids"
              timeFormat="HH:mm"
            />
          </div>
          <div className={classes.col}>
            <Field
              label="Bids validity (days)"
              component={FormattedField}
              name="validityDay"
              options={{
                numeral: true,
                numeralThousandsGroupStyle: 'thousand'
              }}
            />
          </div>
          <div className={classes.col}>
            <Field
              label="Issuance fee ($)"
              component={FormattedField}
              name="insuranceFee"
              options={{
                numeral: true,
                numeralThousandsGroupStyle: 'thousand'
              }}
            />
          </div>
        </div>
        <Field
          label="Location to receive bids"
          component={InputField}
          name="receiveBidLocation"
        />

        <Field
          label="Work place"
          component={InputField}
          name="workplace"
        />

        <p className={classes.title}>
          Bid opening
        </p>
        <div className={classes.row}>
          <div className={classes.col}>
            <Field
              label="Bid estimate ($)"
              component={FormattedField}
              name="estimate"
              options={{
                numeral: true,
                numeralThousandsGroupStyle: 'thousand'
              }}
            />
          </div>
        </div>

        <Field
          label="Bid opening location"
          component={InputField}
          name="openLocation"
        />
      </div>
      <div className={classes.actions}>
        <Button
          className="btn btnMain"
          type="submit"
          loading={loading}
        >
          { packageId ? 'Save' : 'Next'}
        </Button>
      </div>
    </form>
  )
}

const validate = (values) => {
  const errors = {}

  if (!values.packageName || !values.packageName.trim()) {
    errors.packageName = 'Please enter package name'
  }

  if (!values.procurementPlan || !values.procurementPlan.trim()) {
    errors.procurementPlan = 'Please enter Procurement plan'
  }

  if (!values.offeree) {
    errors.offeree = 'Please select offeree'
  }

  if (!values.project) {
    errors.project = 'Please select Project'
  }

  if (!values.field || !values.field.trim()) {
    errors.field = 'Please enter fields'
  }

  if (!values.contractType || !values.contractType.trim()) {
    errors.contractType = 'Please enter contract type'
  }

  if (!values.foundingSource || !values.foundingSource.trim()) {
    errors.foundingSource = 'Please enter funding source'
  }

  if (!values.biddingType) {
    errors.biddingType = 'Please select bidding type'
  }

  if (!values.biddingMethod) {
    errors.biddingMethod = 'Please select bidding method'
  }

  if (!values.publicTime) {
    errors.publicTime = 'Please select public time'
  }

  if (!values.durationOfContractFrom || !values.durationOfContractFrom.from || !values.durationOfContractFrom.to) {
    errors.durationOfContractFrom = 'Please select from date and to date'
  }

  if (!values.timeReceiveBids || !values.timeReceiveBids.from || !values.timeReceiveBids.to) {
    errors.timeReceiveBids = 'Please enter select from date and to date'
  }

  if (values.publicTime
    && values.durationOfContractFrom
    && values.durationOfContractFrom.from
    && values.durationOfContractFrom.to
    && values.timeReceiveBids
    && values.timeReceiveBids.from
    && values.timeReceiveBids.to
  ) {
    const publicTime = moment(values.publicTime, 'MM/DD/YYYY HH:mm').format('YYYY-MM-DD HH:mm')
    const fromContractDate = moment(values.durationOfContractFrom.from, 'MM/DD/YYYY HH:mm').format('YYYY-MM-DD HH:mm')
    const toContractDate = moment(values.durationOfContractFrom.to, 'MM/DD/YYYY HH:mm').format('YYYY-MM-DD HH:mm')
    const fromReceiveBids = moment(values.timeReceiveBids.from, 'MM/DD/YYYY HH:mm').format('YYYY-MM-DD HH:mm')
    const toReceiveBids = moment(values.timeReceiveBids.to, 'MM/DD/YYYY HH:mm').format('YYYY-MM-DD HH:mm')

    if (fromReceiveBids < publicTime) {
      errors.timeReceiveBids = 'Please select time receive bid > public time'
    } else if (toReceiveBids <= fromReceiveBids) {
      errors.timeReceiveBids = 'Please select time receive bid to date > from date'
    }
    if (fromContractDate < toReceiveBids) {
      errors.durationOfContractFrom = 'Please select duration contract date > time receive bid'
    } else if (toContractDate <= fromContractDate) {
      errors.durationOfContractFrom = 'Please select duration contract date to date > from date'
    }
  }

  if (!values.validityDay || !values.validityDay.trim()) {
    errors.validityDay = 'Please enter bid validity'
  }

  if (!values.insuranceFee || !values.insuranceFee.trim()) {
    errors.insuranceFee = 'Please enter insurance fee'
  }

  if (!values.receiveBidLocation || !values.receiveBidLocation.trim()) {
    errors.receiveBidLocation = 'Please enter location to receive bids'
  }

  if (!values.workplace || !values.workplace.trim()) {
    errors.workplace = 'Please enter work place'
  }

  if (!values.estimate || !values.estimate.trim()) {
    errors.estimate = 'Please enter estimate'
  }

  if (!values.openLocation || !values.openLocation.trim()) {
    errors.openLocation = 'Please enter bid opening location'
  }

  return errors
}

export default reduxForm({
  form: 'BasicInfo',
  validate,
  enableReinitialize: true,
})(BasicInfo)
