import React, { Component } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { renderField } from '../../Form'
import * as Api from '../../api/api'
import classes from './LogoField.module.scss'
import ModalChangeImage from '../ModalChangeImage';

class CropImageField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      url: '',
      showSelectImage: false
    }
  }

  handleChange = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      return
    }
    if (file.size > 3 * 1024 * 1024) {
      // show error
      return
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        url: reader.result
      })
      this.apply(file)
    };
  }

  apply = async (file) => {
    this.handleCloseSelectImage()
    const { input } = this.props
    const size = file.size
    const formData = new FormData()
    formData.append('file_data', file, file.name)
    try {
      const result = await Api.post({
        url: '/public/upload-images',
        data: formData,
        options: {
          onUploadProgress: (progressEvent) => {
            this.setState({
              progress: (progressEvent.loaded / size) * 100
            })
          }
        }
      })
      // console.log('response upload image', result.data.url)
      input.onChange(result.data[0].urlImage)
      this.setState({
        progress: 100
      }, () => {
        setTimeout(() => {
          this.setState({
            progress: 0
          })
        }, 300)
      })
    } catch (e) {
      console.log(e)
      this.setState({
        progress: 0,
        url: ''
      })
    }

    // const newValue = value || []
  }

  handleShowSelectImage = () => {
    this.setState({
      showSelectImage: true
    })
  }

  handleCloseSelectImage = () => {
    this.setState({
      showSelectImage: false
    })
  }

  render() {
    const value = this.props.input.value
    const { progress, url, showSelectImage } = this.state
    return (
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <div className={classNames(classes.imageWrapper, value && classes.noBorder)}>
            { (url || value) && <img src={url || value} className={classes.image} alt="logo" />}
            { progress > 0
              && (
              <div className={classes.progress}>
                <CircularProgressbar
                  value={progress}
                  strokeWidth={2}
                />
              </div>
              )}
          </div>
          <a
            className="btn btnBlue"
            onClick={this.handleShowSelectImage}
          >
            <FormattedMessage
              id="LogoField.addFile"
              defaultMessage="AddFile"
            />
          </a>
        </div>
        {/* <input type='file'
          className={classes.file}
          ref={(fileInput) => this.fileInput = fileInput}
          onChange={this.handleChange}
          accept="image/x-png,image/jpg,image/jpeg"
        /> */}
        { showSelectImage
          && (
          <ModalChangeImage
            show={showSelectImage}
            onHide={this.handleCloseSelectImage}
            handleSelectImage={this.apply}
            round
            srcImage={url || value}
          />
          )}

      </div>
    )
  }
}

export default renderField(CropImageField)
