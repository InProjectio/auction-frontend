import React from 'react'
import wordIcon from 'images/fileIcons/word.svg'
import csvIcon from 'images/fileIcons/csv.svg'
import excel from 'images/fileIcons/excel.svg'
import docIcon from 'images/fileIcons/doc.svg'
import powerpointIcon from 'images/fileIcons/powerpoint.svg'
import pptIcon from 'images/fileIcons/ppt.svg'
import txtIcon from 'images/fileIcons/txt.svg'
import xlsIcon from 'images/fileIcons/xls.svg'
import pdfIcon from 'images/fileIcons/pdf.svg'
import classNames from 'classnames'
import classes from './FileType.module.scss'

export const isImage = (fileName) => /[\/.](gif|jpg|jpeg|tiff|png|svg)$/i.test(fileName)

const fileType = (filename) => {
  const extend = filename ? filename.split('.').pop() : 'File';
  if (!filename) {
    return 'File'
  } if (extend.toUpperCase() === 'DOCX') {
    return <img src={wordIcon} className={classes.imageFile} alt="img" />
  } if (extend.toUpperCase() === 'DOC') {
    return <img src={docIcon} className={classes.imageFile} alt="img" />
  } if (extend.toUpperCase() === 'XLS') {
    return <img src={xlsIcon} className={classes.imageFile} alt="img" />
  } if (extend.toUpperCase() === 'XLSX') {
    return <img src={excel} className={classes.imageFile} alt="img" />
  } if (extend.toUpperCase() === 'CSV') {
    return <img src={csvIcon} className={classes.imageFile} alt="img" />
  } if (extend.toUpperCase() === 'PPTX') {
    return <img src={powerpointIcon} className={classes.imageFile} alt="img" />
  } if (extend.toUpperCase() === 'PPT') {
    return <img src={pptIcon} className={classes.imageFile} alt="img" />
  } if (extend.toUpperCase() === 'TXT') {
    return <img src={txtIcon} className={classes.imageFile} alt="img" />
  } if (extend.toUpperCase() === 'PDF') {
    return <img src={pdfIcon} className={classes.imageFile} alt="img" />
  }
  return extend
}

const FileType = ({ item, size }) => {
  let element = 'LINK'
  if (isImage(item.url)) {
    element = <img src={item.url} className={classes.image} alt="img" />
  } else {
    element = fileType(item.url)
  }
  return (
    <div className={classNames(classes.attachmentType, size === 'sm' && classes.sm)}>
      {element}
    </div>
  )
}

export default FileType
