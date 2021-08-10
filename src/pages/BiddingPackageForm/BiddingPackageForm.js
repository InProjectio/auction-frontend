import React, { useEffect, useState, useMemo } from 'react'
import classNames from 'classnames'
import * as Api from 'api/api'
import { BIDDERS_METHODS_OBJ, BIDDERS_OBJ } from 'utils/constants'
import history from 'utils/history'
import smartContractPackage from 'utils/smartContract/package'
import { useSmartContract } from 'utils/smartContract/hooks'
import { convertSmartContractData } from 'utils/utils'
import moment from 'moment'
import classes from './BiddingPackageForm.module.scss'
import BasicInfo from './BasicInfo'
import PackageDescription from './PackageDescription'

const BiddingPackageForm = ({ match }) => {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({})
  const [loading, handleSubmitMetaMask] = useSmartContract()
  const [detail, setDetail] = useState({})

  const [maxStep, setMaxStep] = useState(1)

  const getDetail = async () => {
    try {
      const result = await Api.auction.get({
        url: '/api/bidding/package/find-detail',
        params: {
          packageId: match.params.packageId
        }
      })

      setDetail(result.data)
    } catch (e) {
      return Promise.reject
    }
  }

  const [initDataBasicInfo, initDataPackageDescription] = useMemo(() => {
    if (detail._id) {
      const initDataBasicInfo = {
        ...detail,
        offeree: detail.offeree && {
          label: detail.offeree?.entityName,
          value: detail.offeree?._id,
        },
        foundingSource: `${detail.foundingSource || ''}`,
        biddingMethod: detail.biddingMethod && {
          label: BIDDERS_METHODS_OBJ[detail.biddingMethod],
          value: detail.biddingMethod,
        },
        biddingType: detail.biddingType && {
          label: BIDDERS_OBJ[detail.biddingType],
          value: detail.biddingType,
        },
        durationOfContractFrom: detail.fromContractDate && {
          from: moment(detail.fromContractDate).format('MM/DD/YYYY'),
          to: moment(detail.toContractDate).format('MM/DD/YYYY')
        },
        timeReceiveBids: detail.fromReceiveDate && {
          from: moment(detail.fromReceiveDate).format('MM/DD/YYYY HH:mm'),
          to: moment(detail.toReceiveDate).format('MM/DD/YYYY HH:mm')
        },
        publicTime: moment(detail.publicTime).format('MM/DD/YYYY HH:mm'),
        project: detail.project && {
          label: detail.projectName,
          value: detail.project,
        },
        validityDay: `${detail.validityDay || ''}`,
        insuranceFee: `${detail.insuranceFee || ''}`,
        estimate: `${detail.estimate || ''}`,
      }
      setData(initDataBasicInfo)
      const initDataPackageDescription = {
        documentAttackFiles: detail.documentAttackFiles && detail.documentAttackFiles.map((item, i) => ({ id: i, url: item })),
        packagesRelation: detail.packagesRelation && detail.packagesRelation.map((item) => ({
          label: item?.packageName,
          value: item?._id
        })),
        content: detail.content || ''
      }
      return [initDataBasicInfo, initDataPackageDescription]
    }
    return [{}, {}]
  }, [detail])

  useEffect(() => {
    if (match.params.packageId) {
      setMaxStep(2)
      getDetail()
    }
  }, [])

  const handleNextStep = async (values) => {
    if (match.params.packageId) {
      await handleSubmitMetaMask({
        transactionType: 'UPDATE',
        transactionSummary: 'Update package',
        smartContractCall: smartContractPackage.methods.editPackage(
          match.params.packageId,
          convertSmartContractData(values)
        ),
        apiCall: (transactionHash) => Api.auction.post({
          url: '/api/bidding/package/save-package',
          data: {
            ...values,
            offeree: values.offeree?.value,
            project: values.project?.value,
            projectName: values.project?.label,
            biddingType: values.biddingType?.value,
            biddingMethod: values.biddingMethod?.value,
            fromContractDate: moment(values.durationOfContractFrom.from, 'MM/DD/YYYY').format('YYYY-MM-DD'),
            toContractDate: moment(values.durationOfContractFrom.to, 'MM/DD/YYYY').format('YYYY-MM-DD'),
            fromReceiveDate: moment(values.timeReceiveBids.from, 'MM/DD/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
            toReceiveDate: moment(values.timeReceiveBids.to, 'MM/DD/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
            publicTime: moment(values.publicTime, 'MM/DD/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
            transactionHash,
            packageId: match.params.packageId
          }
        })
      })
      history.goBack()
    } else {
      setData(values)
      setStep(2)
      setMaxStep(2)
    }
  }

  const handleComplete = async (values) => {
    try {
      const submitData = {
        ...data,
        ...values,
        packagesRelation: values.packagesRelation && values.packagesRelation.map((item) => item.value),
        offeree: data.offeree?.value,
        project: data.project?.value,
        projectName: data.project?.label,
        biddingType: data.biddingType?.value,
        biddingMethod: data.biddingMethod?.value,
        fromContractDate: moment(data.durationOfContractFrom.from, 'MM/DD/YYYY').format('YYYY-MM-DD'),
        toContractDate: moment(data.durationOfContractFrom.to, 'MM/DD/YYYY').format('YYYY-MM-DD'),
        fromReceiveDate: moment(data.timeReceiveBids.from, 'MM/DD/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
        toReceiveDate: moment(data.timeReceiveBids.to, 'MM/DD/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
        publicTime: moment(data.publicTime, 'MM/DD/YYYY HH:mm').format('YYYY-MM-DD HH:mm'),
        documentAttackFiles: values.documentAttackFiles && values.documentAttackFiles.map((item) => item.url),
        packageId: match.params.packageId
      }
      if (match.params.packageId) {
        await handleSubmitMetaMask({
          transactionType: 'UPDATE',
          transactionSummary: 'Update package',
          smartContractCall: smartContractPackage.methods.editPackage(
            match.params.packageId,
            convertSmartContractData(submitData)
          ),
          apiCall: (transactionHash) => Api.auction.post({
            url: '/api/bidding/package/save-package',
            data: {
              ...submitData,
              transactionHash
            }
          })
        })
      } else {
        const resultAdd = await Api.auction.post({
          url: '/api/bidding/package/save-package',
          data: submitData
        })
        try {
          await handleSubmitMetaMask({
            transactionType: 'ADD',
            transactionSummary: 'Add package',
            smartContractCall: smartContractPackage.methods.addPackage(
              resultAdd.data._id,
              submitData.offeree,
              convertSmartContractData({
                ...submitData,
                packageId: resultAdd.data._id
              })
            ),
            apiCall: (transactionHash) => Api.auction.post({
              url: '/api/bidding/package/save-package',
              data: {
                ...submitData,
                packageId: resultAdd.data._id,
                transactionHash
              }
            })
          })
        } catch (e) {
          Api.auction.deleteData({
            url: `/api/bidding/package/delete-package/${resultAdd.data._id}`,
          })
          return Promise.reject(e)
        }
      }
      history.push('/company/auction/offeree')
    } catch (e) {
      return Promise.reject(e)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.head}>
          <div
            className={classNames(classes.stepWrapper, step === 1 && classes.active)}
            onClick={() => {
              setStep(1)
            }}
          >
            <div className={classes.step}>
              1
            </div>
            Basic information
          </div>
          <div
            className={classNames(classes.stepWrapper, step === 2 && classes.active)}
            onClick={() => {
              if (maxStep === 2) {
                setStep(2)
              }
            }}
          >
            <div className={classes.step}>
              2
            </div>
            Package description
          </div>
        </div>
        <div className={classes.wrapper}>
          { step === 1
            && (
            <BasicInfo
              submitForm={handleNextStep}
              initialValues={data.packageName ? data : initDataBasicInfo}
              packageId={match.params.packageId}
              loading={loading}
            />
            )}

          { step === 2
            && (
            <PackageDescription
              submitForm={handleComplete}
              loading={loading}
              initialValues={initDataPackageDescription}
              packageId={match.params.packageId}
            />
            )}

        </div>
      </div>
    </div>
  )
}

export default BiddingPackageForm
