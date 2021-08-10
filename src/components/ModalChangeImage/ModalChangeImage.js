import React, { Component } from 'react'
import classNames from 'classnames'
import AvatarImageCropper from 'react-avatar-image-cropper'
import { CircularProgressbar } from 'react-circular-progressbar';
import S3 from 'react-aws-s3'
import moment from 'moment'
import classes from './ModalChangeImage.module.scss'

export default class ModalChangeImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
    }
  }

  apply = async (file) => {
    const { saveAvatar } = this.props
    const formData = new FormData()
    formData.append('files', file, file.name)
    try {
      const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        dirName: '', /* optional */
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS_ID,
        secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
      };
      const ReactS3Client = new S3(config)
      const result = await ReactS3Client.uploadFile(file, `${moment().unix()}---${file.name}`)
      console.log(result)
      // console.log('response upload image', result.data.url)
      saveAvatar(result.location)
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
      })
    }

    // const newValue = value || []
  }

  errorHandler = (type) => {
    console.log(type);
  }

  // Ten plik jest za duży. Max rozmiar zdjęcia to 3MB
  render() {
    const { srcImage, round } = this.props
    const { progress } = this.state

    return (
      <div className={classes.container}>
        <div className={classes.content}>

          <div
            style={{ width: 100,
              height: 100,
              backgroundImage: `url("${srcImage}")`
            }}
            className={classNames(classes.cropWrapper, round && classes.round)}
          >
            { progress > 0
                && (
                <div className={classes.progress}>
                  <CircularProgressbar
                    value={progress}
                    strokeWidth={2}
                  />
                </div>
                )}
            <AvatarImageCropper
              apply={this.apply}
              isBack
              rootStyle={{
                borderRadius: '50%'
              }}
              text=" "
              errorHandler={this.errorHandler}
            />

          </div>

        </div>
      </div>
    )
  }
}
