import React from 'react'
import { renderField } from 'Form'
import ReactQuill, { Quill } from 'react-quill';
import MarkdownShortcuts from 'quill-markdown-shortcuts';
import classes from './QuillField.module.scss'

Quill.register('modules/markdownShortcuts', MarkdownShortcuts);

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'color', 'strike'],
      ['link', 'image', 'video'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['clean']
    ]
  },
  markdownShortcuts: {}
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
];

const QuillField = ({ input }) => (
  <div className={classes.container}>
    <ReactQuill
      theme="snow"
      value={input.value || ''}
      formats={formats}
      modules={modules}
      onChange={input.onChange}
      className={classes.field}
      maxLength={2000}
    />
  </div>
)

export default renderField(QuillField)
