import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { renderField } from '../../Form';
import classes from './PhotosField.module.scss'
import { CropImageField } from '../CropImageField/CropImageField';

class PhotosField extends Component {
  handleChange = (id) => (url) => {
    const { value, changeValue } = this.props
    const newValue = value.map((image) => {
      if (image.id === id) {
        return {
          ...image,
          url
        }
      }
      return image
    })
    // console.log('handleChange', newValue)
    changeValue(newValue)
  }

  handleAddFile = () => {
    const { value, changeValue } = this.props
    changeValue([...value, { url: '', id: new Date().valueOf(), isTempId: true }])
  }

  handleDelete = (id) => () => {
    const { value, changeValue } = this.props
    const newValue = value.filter((image) => image.id !== id)
    changeValue(newValue)
  }

  render() {
    const { value } = this.props
    return (
      <div className={classes.container}>
        { value && value.map((image) => (
          <div
            key={image.id}
            className={classes.imageWrapper}
          >
            <div className={classes.inner}>
              <CropImageField
                value={image}
                changeValue={this.handleChange(image.id)}
                width="100%"
                height="100%"
                handleDelete={this.handleDelete(image.id)}
              />
            </div>
          </div>
        )) }
        <div className={classes.btnAdd}>

          <a
            className="btn btnBlue"
            onClick={this.handleAddFile}
          >
            <FormattedMessage
              id="PhotosField.addFile"
              defaultMessage="Add File"
            />
          </a>
        </div>
      </div>
    )
  }
}

export default renderField(PhotosField)
