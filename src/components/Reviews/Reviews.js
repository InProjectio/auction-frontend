import React, { useEffect, useState } from 'react'
import starIcon from 'images/star.svg'
import * as Api from 'api/api'
import { formatStringToNumber } from 'utils/utils'
import Lightbox from 'react-image-lightbox';
import { FileURL } from 'utils/config'
import ReviewsItem from './ReviewsItem'
import classes from './Reviews.module.scss'

const Reviews = ({ itemId }) => {
  const [reviews, setReviews] = useState([])
  const [pageInfo, setPageInfo] = useState({})
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photos, setPhotos] = useState([])

  useEffect(async () => {
    const result = await Api.get({
      url: '/dynamic/user/get-cmt',
      params: {
        item: itemId,
        page: 1,
        pageSize: 10
      }
    })

    setReviews(result.data.docs)
    setPageInfo({
      hasNextPage: result.data.hasNextPage,
      page: result.data.page,
      totalElements: result.data.totalDocs
    })
  }, [itemId])

  const openLightbox = ({ index, images }) => {
    setPhotos(images.map((image) => `${FileURL}${image}`))
    setCurrentImage(index);
    setViewerIsOpen(true);
  }

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  }

  return (
    <div className={classes.container}>
      { (reviews && reviews.length > 0)
        && (
        <div className={classes.evaluate}>
          <img src={starIcon} alt="imf-star" className={classes.img} />
          <p className={classes.number}>{formatStringToNumber(reviews[0].item.report.rateAverage)}</p>
          <p className={classes.title}>
            (
            {formatStringToNumber(reviews[0].item.report.totalComment)}
            {' '}
            đánh giá)
          </p>
        </div>
        )}

      <div className={classes.contents}>
        { (reviews && reviews.length > 0) ? reviews.map((item, i) => (
          <div
            className={classes.Review}
            key={i}
          >
            <ReviewsItem
              key={i}
              item={item}
              openLightbox={openLightbox}
            />
          </div>
        ))
          : (
            <p className={classes.empty}>
              Chưa có review nào
            </p>
          )}
      </div>
      { pageInfo.hasNextPage && <a className={classes.link}>Xem thêm đánh giá</a>}

      {viewerIsOpen && (
      <Lightbox
        mainSrc={photos[currentImage]}
        nextSrc={photos[(currentImage + 1) % photos.length]}
        prevSrc={photos[(currentImage + photos.length - 1) % photos.length]}
        onCloseRequest={closeLightbox}
        onMovePrevRequest={() => setCurrentImage((currentImage + photos.length - 1) % photos.length)}
        onMoveNextRequest={() => setCurrentImage((currentImage + 1) % photos.length)}
      />
      )}
    </div>
  )
}
export default Reviews
