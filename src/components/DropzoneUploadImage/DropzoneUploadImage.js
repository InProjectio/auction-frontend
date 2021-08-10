import React, { Component } from 'react'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import Dropzone from 'react-dropzone-uploader'
import * as Api from 'api/api'
import { FileURL } from 'utils/config'
import { renderField } from '../../Form'
import classes from './DropzoneUploadImage.module.scss'

class DropzoneUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: {}
    }
  }

  getFilesFromEvent = (e) => new Promise((resolve) => {
    getDroppedOrSelectedFiles(e).then((chosenFiles) => {
      resolve(chosenFiles.map((f) => f.fileObject))
    })
  })

  getUploadParams = async ({ file }) => {
    console.log('getUploadParams', file)
    const formData = new FormData()
    formData.append('files', file)
    this.setState({ uploading: true })
    const size = file.size
    const id = this.uuidv4()
    const { input } = this.props
    const {
      value,
      onChange
    } = input
    const valueArr = value || []
    try {
      onChange([...valueArr, { id, url: file.name, status: 'UPLOADING' }])
      const result = await Api.post({
        url: '/public/upload-images',
        data: formData,
        options: {
          onUploadProgress: (progressEvent) => {
            const progress = progressEvent.loaded / size
            // console.log('progress ====>', progress)
            this.setState((prevState) => ({
              ...prevState,
              loading: {
                ...prevState.loading,
                [id]: progress
              }
            }))
          }
        }
      })

      console.log(result)
      const newValue = this.props.input.value.map((item) => {
        if (item.id === id) {
          return {
            url: result.data[0].urlImage,
            status: 'DONE'
          }
        }
        return item
      })
      onChange(newValue)
    } catch (e) {
      console.log('e', e)
      const newValue = this.props.input.value.filter((item) => item.id !== id)
      onChange(newValue)
    }
    return {
      // url: `${ServiceUploadUrl}/public/upload-compress`,
    }
  }

  Preview = () => {
    const { input } = this.props
    const { value } = input
    const { loading } = this.state
    return (
      <div>
        <div className={classes.files}>
          {value && value.map((file, i) => (
            <div key={i} className={classes.fileWrapper}>
              <div className={classes.file}>
                <div className={classes.left}>
                  <div className={classes.imageWrapper}>
                    {file.url && file.status !== 'UPLOADING'
                      && <img src={`${FileURL}${file.url}`} className={classes.image} alt="img" />}

                  </div>
                  <p className={classes.fileName}>
                    {file.url}
                  </p>
                </div>
                <a
                  className={classes.btnClose}
                  onClick={this.handleRemoveDocument(i)}
                >
                  <FontAwesomeIcon icon={faTimes} className={classes.times} />
                </a>
              </div>
              { loading[file.id] && loading[file.id] !== 1
                && (
                <div className={classes.row}>
                  <div className={classes.progressWrapper}>
                    <div className={classes.progress} style={{ width: `${loading[file.id] * 100}%` }} />
                  </div>
                  <p className={classes.percent}>
                    {`${Math.round(loading[file.id] * 100)}%`}
                  </p>
                </div>
                )}

            </div>
          ))}
        </div>
      </div>

    )
  }

  Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const text = files.length > 0 ? 'Thêm ảnh' : 'Chọn ảnh'
    const { maxFiles, input } = this.props
    return (
      <div className={classNames(classes.inputComponent, maxFiles <= input.value.length && classes.pb0)}>
        { this.Preview()}
        { (!maxFiles || maxFiles > input.value.length)
          && (
          <>
            <p className={classes.text}>
              Kéo thả ảnh vào đây
            </p>
            <p className={classes.or}>
              Hoặc
            </p>
            <div className={classes.actions}>
              <label className="btn btnBlue btnSmall">
                {text}
                <input
                  style={{ display: 'none' }}
                  type="file"
                  accept={accept}
                  multiple
                  onChange={(e) => {
                    getFilesFromEvent(e).then((chosenFiles) => {
                      onFiles(chosenFiles)
                    })
                  }}
                />
              </label>
            </div>
          </>
          )}

      </div>

    )
  }

  handleRemoveDocument = (pos) => () => {
    console.log(this.dropzoneRef)
    this.dropzoneRef.handleRemove(this.dropzoneRef.files[pos])
    const { input } = this.props
    const newValue = input.value.filter((item, i) => i !== pos)
    input.onChange(newValue)
  }

  Layout = ({ input, dropzoneProps }) => (
    <div>
      <div {...dropzoneProps}>{input}</div>
    </div>
  )

  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (
      c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
  }

  render() {
    const { maxFiles, hasError } = this.props
    return (
      <div className={classNames(classes.container, hasError && 'errorWrapper')}>
        <Dropzone
          inputContent="Kéo thả ảnh vào đây"
          InputComponent={this.Input}
          LayoutComponent={this.Layout}
          getUploadParams={this.getUploadParams}
          multiple
          getFilesFromEvent={this.getFilesFromEvent}
          // PreviewComponent={null}
          maxFiles={maxFiles || 100}
          accept="image/*"
          ref={(ref) => this.dropzoneRef = ref}
        // onChangeStatus={this.handleChangeStatus}
        />
      </div>
    )
  }
}

export default renderField(DropzoneUploader)
