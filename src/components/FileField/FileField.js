import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
// import classNames from 'classnames'
import Loading from 'react-loading-bar'
import { renderField } from '../../Form';
import classes from './FileField.module.scss'
import * as Api from '../../api/api'

class FileField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  handleChange = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      // show error
    }
    this.apply(file)
  }

  apply = async (file) => {
    const { changeValue } = this.props
    const formData = new FormData()
    formData.append('files', file)
    try {
      this.setState({
        loading: true
      })
      const result = await Api.post({
        url: '/public/upload-compress',
        data: formData,
      })
      changeValue(result.data.url)
      this.setState({
        loading: false
      })
    } catch (e) {
      this.setState({
        loading: false
      })
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

  render() {
    const { value } = this.props
    const { loading } = this.state
    return (
      <div className={classes.container}>
        { loading
          ? (
            <Loading
              show
              color="#005581"
            />
          )
          : (
            <>
              { value
            && (
            <a
              className={classes.btnEdit}
              href={value}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faPaperclip} className={classes.faPaperclip} />
            </a>
            )}
            </>
          )}
        <div className={classes.btnAdd}>

          <a
            className="btn btnBlue"
            onClick={this.handleAddFile}
          >
            Thêm file
          </a>
        </div>
        <input
          type="file"
          className={classes.file}
          ref={(fileInput) => this.fileInput = fileInput}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default renderField(FileField)
