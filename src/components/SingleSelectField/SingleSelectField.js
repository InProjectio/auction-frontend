import React, { Component } from 'react'
import classNames from 'classnames'
import Slider from 'react-slick';
import { renderField } from '../../Form'
import classes from './SingleSelectField.module.scss'

class SingleSelectField extends Component {
  handleSelectOption = (option) => () => {
    this.props.changeValue(option)
  }

  render() {
    const { options,
      value,
    } = this.props
    const settings = {
      dots: false,
      infinite: false,
      slidesToShow: 4.2,
      slidesToScroll: 4,
    };
    return (
      <div className={classes.container}>
        <Slider {...settings}>
          { options && options.map((option) => (
            <div
              className={classes.optionContainer}
              key={option.value}
            >
              <div
                className={classNames(classes.option, value && value.value === option.value && classes.selected)}
                onClick={this.handleSelectOption(option)}
              >
                <p className={classes.label}>
                  { option.label }
                </p>
                <p className={classes.value}>
                  { option.value }
                </p>
              </div>
            </div>
          )) }
        </Slider>
      </div>
    )
  }
}

export default renderField(SingleSelectField)
