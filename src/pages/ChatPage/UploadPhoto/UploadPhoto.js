import React from 'react'
import * as Api from 'api/api'
import { photoUploadUrl } from 'config'
import classes from './UploadPhoto.scss'

class UploadPhoto extends React.Component {
    apply = async (file) => {
      console.log('CropImageField', file)
      const formData = new FormData()
      formData.append('files', file)

      const result = await Api.post({
        url: 'public/image/upload',
        params: {
          type: 'CHAT'
        },
        data: formData,
        baseURL: photoUploadUrl
      })
      const photoResult = result.files[0]
      console.log('Uploaded: ', result.files[0])
      if (photoResult && photoResult.url) {
        // respponse data
      }
      // changeValue(result.files[0])
    }

    render() {
      return (
        <div className={classes.imgBg}>
          <img src={this.props.url} className={classes.lagerPhoto} alt="largephoto" resize="contain" />
          <button className={classes.sendButton} onClick={this.props.sendPhoto}>Send</button>
        </div>
      );
    }
}

export default UploadPhoto
