import React, { useEffect, useState } from 'react'
import {
  Field,
  reduxForm
} from 'redux-form'
import DropzoneUploader from 'components/DropzoneUploader/DropzoneUploader'
import QuillField from 'components/QuillField'
import Button from 'components/Button'
import SelectField from 'components/SelectField'
import * as Api from 'api/api'
import classes from './PackageDescription.module.scss'

const PackageDescription = ({ submitForm, handleSubmit, loading, packageId }) => {
  const [packages, setPackages] = useState([])
  const getPackages = async () => {
    try {
      const result = await Api.auction.post({
        url: '/api/bidding/package/find-list',
        data: {
          companyId: localStorage.getItem('companyId'),
          page: 1,
          pageSize: 1000
        }
      })

      let data = result.data.docs
      if (packageId) {
        data = data.filter((item) => item._id !== packageId)
      }

      setPackages(data.map((item) => ({
        label: item.packageName,
        value: item._id
      })))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getPackages()
  }, [])
  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit(submitForm)}
    >
      <div className={classes.wrapper}>
        <p className={classes.title}>
          Package
        </p>

        <Field
          name="documentAttackFiles"
          component={DropzoneUploader}
          label="Bidding documents"
        />

        <Field
          name="packagesRelation"
          component={SelectField}
          label="Related packages"
          isMulti
          options={packages}
        />

        <Field
          name="content"
          component={QuillField}
          label="Description"
        />
      </div>

      <div className={classes.actions}>
        <Button
          className="btn btnMain"
          type="submit"
          loading={loading}
        >
          { packageId ? 'Save' : 'Publish'}
        </Button>
      </div>

    </form>
  )
}

const validate = () => {
  const errors = {}

  return errors
}

export default reduxForm({
  form: 'PackageDescription',
  validate,
  enableReinitialize: true,
})(PackageDescription)
