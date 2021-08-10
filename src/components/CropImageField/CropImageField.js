import React, { Component } from 'react'

import Loading from 'react-loading-bar'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import AvatarImageCropper from 'react-avatar-image-cropper'
import { renderField } from '../../Form'
import * as Api from '../../api/api'
import classes from './CropImageField.module.scss'

export class CropImageField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  apply = async (file) => {
    const { input } = this.props
    const formData = new FormData()
    formData.append('file_data', file, file.name)
    try {
      this.setState({
        loading: true
      })
      const result = await Api.post({
        url: '/provider/medias/photos',
        data: formData,
      })
      input.onChange(result.data.url)
      this.setState({
        loading: false
      })
    } catch (e) {
      input.onChange(null)
      this.setState({
        loading: false
      })
    }

    // const newValue = value || []
  }

  render() {
    const { width,
      height,
      input,
      handleDelete
    } = this.props
    const src = input.value && input.value.url
    // console.log('CropImageField', src)
    const { loading } = this.state
    const actions = [
      <button
        key={0}
        type="button"
        className={classes.btnRemove}
      >
        {' '}
        <img src="/close-black.png" alt="close" className={classes.closeIcon} />
        {' '}

      </button>,
      <button
        key={1}
        type="button"
        className={classes.btnAccept}
      >
        {' '}
        <img src="/check-white.png" alt="close" className={classes.checkIcon} />
        {' '}

      </button>,
    ]
    const maxsize = 1024 * 1024 * 3
    return (
      <div className={classes.container}>
        <div
          style={{ width,
            height,
            backgroundImage: `url('${src}')`
          }}
          className={classNames(classes.wrapper, 'cropImage')}
        >
          <AvatarImageCropper
            apply={this.apply}
            isBack
            actions={actions}
            maxsize={maxsize}
            className={classes.avatarWrapper}
            rootStyle={{
            }}
            text="Dodaj zdjęcie"
          />
          <Loading
            show={loading}
            color="#005581"
          />
          <a
            className={classes.btnDelete}
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faTrash} className={classes.deleteIcon} />
          </a>
        </div>
      </div>
    )
  }
}

export default renderField(CropImageField)
