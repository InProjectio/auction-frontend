import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import Loading from 'react-loading-bar'
import { renderField } from '../../Form';
import classes from './PhotosWithoutCropField.module.scss'
import * as Api from '../../api/api'

class PhotosWithoutCropField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: {}
    }
  }

  handleChange = async (e) => {
    const { changeValue, value } = this.props
    const file = e.target.files[0]
    if (!file) {
      return
    }
    if (file.size > 3 * 1024 * 1024) {
      return
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.fileInput.value = ''
      const id = this.uuidv4()
      console.log(id)
      const valueArr = value || []
      const newValue = [...valueArr, {
        id,
        url: reader.result,
        isTempId: true
      }]
      changeValue(newValue)
      this.apply(file, id)
    };
  }

  apply = async (file, id) => {
    const { changeValue, value } = this.props
    const formData = new FormData()
    formData.append('file_data', file)
    try {
      this.setState((prevState) => ({
        ...prevState,
        loading: {
          ...prevState.loading,
          [id]: true
        }
      }))
      const result = await Api.post({
        url: '/provider/medias/photos',
        data: formData,
      })
      // console.log('response upload image', result.data.url)
      const newValue = value.map((image) => {
        if (image.id === id) {
          return {
            ...image,
            url: result.data.url
          }
        }
        return image
      })
      changeValue(newValue)
      this.setState((prevState) => ({
        ...prevState,
        loading: {
          ...prevState.loading,
          [id]: false
        }
      }))
    } catch (e) {
      const newValue = value.filter((image) => image.id !== id)
      changeValue(newValue)
      this.setState((prevState) => ({
        ...prevState,
        loading: {
          ...prevState.loading,
          [id]: false
        }
      }))
    }

    // const newValue = value || []
  }

  handleAddFile = () => {
    this.fileInput.click()
  }

  handleDelete = (id) => () => {
    const { value, changeValue } = this.props
    const newValue = value.filter((image) => image.id !== id)
    changeValue(newValue)
  }

  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (
      c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
  }

  render() {
    const { value, disabled } = this.props
    const { loading } = this.state
    return (
      <div className={classes.container}>
        { value && value.map((image) => (
          <div
            key={image.id}
            className={classNames(classes.imageWrapper, 'photos')}
            style={{ backgroundImage: `url("${image.url}")` }}
          >
            {/* <img src={image.url} className={classes.image} /> */}
            <a
              className={classNames(classes.btnDelete, disabled && classes.disabled)}
              onClick={this.handleDelete(image.id)}
            >
              <FontAwesomeIcon icon={faTrash} className={classes.deleteIcon} />
            </a>
            <Loading
              show={loading[image.id]}
              color="#005581"
            />
          </div>
        )) }
        <div className={classes.btnAdd}>

          <a
            className={classNames('btn btnBlue', disabled && classes.disabled)}
            onClick={this.handleAddFile}
          >
            <FormattedMessage
              id="PhotosWithoutCropField.addFile"
              defaultMessage="Add File"
            />
          </a>
        </div>
        <input
          type="file"
          className={classes.file}
          ref={(fileInput) => this.fileInput = fileInput}
          onChange={this.handleChange}
          accept="image/x-png,image/jpg,image/jpeg"
        />
      </div>
    )
  }
}

export default renderField(PhotosWithoutCropField)
