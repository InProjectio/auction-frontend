import React, { useEffect, useState } from 'react'
import classes from './SavingLoading.module.scss'

let interval = null

const SavingLoading = () => {
  const [numberDots, setNumberDots] = useState(0)
  useEffect(() => {
    interval = setInterval(() => {
      // console.log('test')
      setNumberDots((prevDots) => (prevDots >= 5 ? 0 : prevDots + 1))
    }, 500)
    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <div className={classes.text}>
      Saving to smart contract
      { Array.from({ length: numberDots }).map((item, i) => <span key={i}>.</span>) }
    </div>
  )
}

export default SavingLoading
