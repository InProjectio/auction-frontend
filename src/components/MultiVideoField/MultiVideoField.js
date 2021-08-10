import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import ReactPlayer from 'react-player'
import * as Api from '../../api/api'
import { renderField } from '../../Form'
import classes from './MultiVideoField.module.scss'

class MultiVideoField extends Component {
  b64toBlob = (b64Data, contentTypeInput, sliceSizeInput) => {
    const contentType = contentTypeInput || '';
    const sliceSize = sliceSizeInput || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  timeupdate = () => {
    if (this.snapImage()) {
      this.video.removeEventListener('timeupdate', this.timeupdate);
      this.video.pause();
    }
  }

  snapImage = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 112;
    canvas.getContext('2d').drawImage(this.video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL();
    // console.log(image)
    const success = image.length > 10000;
    if (success) {
      URL.revokeObjectURL(this.url);
      const block = image.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];
      const blob = this.b64toBlob(realData, contentType);
      const formData = new FormData()
      formData.append('file_data', this.file)
      formData.append('thumb_data', blob)

      await Api.post({
        url: '/provider/medias/videos',
        data: formData,
        options: {
          onUploadProgress: (progressEvent) => console.log(progressEvent.loaded)
        }
      })
    }
    return success;
  }

  handleUploadVideo = async (e) => {
    e.preventDefault();
    this.file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const blob = new Blob([fileReader.result], { type: this.file.type });
      this.url = URL.createObjectURL(blob);
      this.video = document.createElement('video');

      this.video.addEventListener('loadeddata', () => {
        if (this.snapImage()) {
          this.video.removeEventListener('timeupdate', this.timeupdate);
        }
      });
      this.video.addEventListener('timeupdate', this.timeupdate);
      this.video.preload = 'metadata';
      this.video.src = this.url;
      // Load video in Safari / IE11
      this.video.muted = true;
      this.video.playsInline = true;
      this.video.play();
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  render() {
    const { value } = this.props
    return (
      <div className={classes.container}>
        <div className={classes.videos}>
          { value && value.map((video, i) => (
            <div
              className={classes.video}
              key={i}
            >
              <ReactPlayer
                url={video.url}
                width={400}
                height={225}
                controls
              />
            </div>
          )) }
        </div>
        <input
          type="file"
          name="photo"
          id="upload-photo"
          className={classes.file}
          onChange={this.handleUploadVideo}
        />
        <label htmlFor="upload-photo" className={classes.addVideoWrapper}>
          <a className={classes.addVideo}>
            <FormattedMessage
              id="MultiVideoField.add"
              defaultMessage="add"
            />
          </a>
        </label>
      </div>
    )
  }
}

export default renderField(MultiVideoField)
