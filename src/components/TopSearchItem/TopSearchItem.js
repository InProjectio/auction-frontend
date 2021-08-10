import React from 'react'
import { FileURL } from 'utils/config';
import history from 'utils/history';
import emptyProduct from 'images/empty-product.png'
import classes from './TopSearchItem.module.scss'

const COLORS = ['rgba(152, 12, 29, 0.2)', 'rgba(4, 61, 186, 0.2)', 'rgba(196, 168, 112, 0.2)']

const TopSearchItem = (props) => {
  const { item, index } = props;

  const gotoSearch = () => {
    history.push(`/products/search?textSearch=${item.unsignedText}`)
  }

  return (
    <div
      className={classes.container}
      onClick={gotoSearch}
    >
      <div className={classes.contentImg}>
        { item.content.map((ite, i) => (
          <img
            src={`${FileURL}${ite.url}`}
            alt="img-product"
            className={classes.img}
            key={i}
          />
        )) }
        { item.content.length < 3
            && Array.from({ length: 3 - item.content.length }).map((x, i) => (
              <img
                src={emptyProduct}
                alt="img-product"
                className={classes.img}
                key={i}
              />
            ))}
      </div>
      <div
        className={classes.content}
        style={{
          backgroundColor: COLORS[index % 3]
        }}
      >
        <p className={classes.title}>{item.signedText}</p>
        <p className={classes.text}>
          {item.totalResult}
          {' '}
          linh kiện
        </p>
      </div>
    </div>
  )
}

export default TopSearchItem
