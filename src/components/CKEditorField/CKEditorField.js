import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import classNames from 'classnames'
import renderField from '../../Form/renderField'
import classes from './CKEditorField.module.scss'
// import {API_URL} from 'utils/config'
import UploadAdapter from './UploadAdapter'

export class CKEditorField extends React.Component {
  render() {
    const {
      intl,
      note,
      hasError,
      placeholder,
      input
    } = this.props

    // console.log('CKEditorField', input)
    return (
      <div>
        <div className={classNames(classes.inputWrapper, hasError && 'ckeditorError')}>
          <CKEditor
            editor={ClassicEditor}
            data={input.value || ''}
            placeholder={placeholder}
            // config={{
            //   ckfinder: {
            //     // Upload the images to the server using the CKFinder QuickUpload command.
            //     uploadUrl: `${API_URL}/public/upload-images-editor`
            //   } }}
            onInit={(editor) => {
              editor.setData(input.value)
              // eslint-disable-next-line no-param-reassign
              editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
                return new UploadAdapter(loader);
              };
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              // console.log({ event, editor, data });
              input.onChange(data)
            }}
            onBlur={() => {
              // console.log('Blur.', editor);
            }}
            onFocus={() => {
              // console.log('Focus.', editor);
            }}
            ref={(editorRef) => this.editorRef = editorRef}
          />
        </div>
        {note && (
        <p className={classes.note}>
          {typeof note === 'string' ? note : intl.formatMessage(note)}
        </p>
        )}
      </div>
    )
  }
}

export default renderField(CKEditorField)
