import React from 'react'
// import { FormattStringToNumber } from 'utils/utils'
import moment from 'moment'
import defaultAvatar from 'images/defaultAvatar.svg'
import starActive from 'images/star.svg'
import starInactive from 'images/star-inactive.svg'
// import RatingScore from 'pages/CarDetail/components/RatingScrore'
import { FileURL } from 'utils/config'
import classes from './ReviewsItem.module.scss'

const ReviewsItem = (props) => {
  const { item, openLightbox } = props

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <img src={item.user.avatar ? `${FileURL}${item.user.avatar}` : defaultAvatar} alt="avata" className={classes.img} />
        <div className={classes.contentAvata}>
          <p className={classes.name}>{item.user.fullname}</p>
          <div className={classes.contentTitle}>
            <div className={classes.stars}>
              {Array.from({ length: 5 }).map((ite, i) => (
                <img src={item.rating >= i + 1 ? starActive : starInactive} className={classes.icon} alt="star" key={i} />
              ))}
            </div>
            <p className={classes.createdAt}>
              {moment(item.createdAt).format('DD/MM/YYYY')}
            </p>
          </div>
        </div>
      </div>
      <p className={classes.score}>{item.title}</p>
      <p className={classes.message}>{item.content}</p>
      { item.productPics
        && item.productPics.length > 0
        && (
        <div className={classes.images}>
          {item.productPics.map((image, i) => (
            <a
              onClick={() => openLightbox({ index: i, images: item.productPics })}
              key={i}
            >
              <img
                src={`${FileURL}${image}`}
                className={classes.image}
                alt="img"

              />
            </a>

          ))}

        </div>
        )}
    </div>
  )
}

export default ReviewsItem
