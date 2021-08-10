import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import Button from 'components/Button'
import Radio from 'components/Radio'
import classes from './RejectReason.module.scss'

export default class RejectReason extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: {}
    }
  }

  componentDidMount() {
  }

  handleSelectReason = (reason) => () => {
    this.setState({
      selectedOption: reason
    })
  }

  handleSubmit = () => {
    const { selectedOption } = this.state
    this.props.handleReject(selectedOption.reason || selectedOption.title)
  }

  handleChangeOtherReason = (evt) => {
    const reason = evt.target && evt.target.value
    this.setState((prevState) => ({
      ...prevState,
      selectedOption: {
        ...prevState.selectedOption,
        reason
      }
    }))
  }

  render() {
    const {
      handleClose,
      loading,
      title,
      reasons
    } = this.props
    const { selectedOption } = this.state
    return (
      <div className={classes.container}>
        <div className={classes.row}>
          <p className={classes.title}>
            { title }
          </p>
          <a
            className={classes.btnClose}
            onClick={handleClose}
          >
            <FontAwesomeIcon icon={faTimes} className={classes.closeIcon} />
          </a>
        </div>
        <div className={classes.content}>
          { reasons && reasons.map((reason) => (
            <div
              className={classes.reason}
              key={reason.code}
              onClick={this.handleSelectReason(reason)}
            >
              <div className={classes.radio}>
                <Radio active={reason.code === selectedOption.code} />
              </div>
              <p className={classes.reasonName}>
                { reason.title }
              </p>
            </div>
          )) }
          { selectedOption.code === 'OTHER'
            && (
            <textarea
              placeholder="Ghi rõ nội dung"
              onChange={this.handleChangeOtherReason}
              value={selectedOption.reason}
              name={name}
              className={classNames(classes.input)}
              maxLength={500}
              rows={5}
            />
            )}

        </div>
        <div className={classNames(classes.actions, 'fixedActions')}>
          <Button
            className={classNames('btn mr20 btnFixedLeft')}
            type="button"
            onClick={handleClose}
          >
            <FormattedMessage
              id="RejectReason.cancel"
              defaultMessage="Huỷ"
            />
          </Button>
          <Button
            className={classNames('btn btnBlue btnFixedRight')}
            loading={loading}
            onClick={this.handleSubmit}
          >
            <FormattedMessage
              id="RejectReason.send"
              defaultMessage="Gửi"
            />
          </Button>
        </div>
      </div>
    )
  }
}
