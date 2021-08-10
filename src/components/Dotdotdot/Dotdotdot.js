import React, { Component } from 'react'
import lineClamp from 'line-clamp'

export default class Dotdotdot extends Component {
  componentDidMount() {
    const { lineNumbers } = this.props
    setTimeout(() => {
      lineClamp(this.element, lineNumbers)
    }, 300)
  }

  render() {
    const { className } = this.props
    return (
      <div
        ref={(element) => { this.element = element }}
        className={className}
      >
        {this.props.children}
      </div>
    )
  }
}
