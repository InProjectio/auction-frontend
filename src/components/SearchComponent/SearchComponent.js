import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import classes from './SearchComponent.module.scss'

export default class SearchComponent extends Component {
  timeout = null

  constructor(props) {
    super(props)
    this.state = {
      text: props.value || ''
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value && this.props.value !== this.state.text) {
      this.setState({
        text: this.props.value || ''
      })
    }
  }

  handleChange = (e) => {
    const { handleSearch } = this.props
    const { value } = e.target
    this.setState({
      text: value
    })
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      handleSearch(value)
    }, 300)
  }

  handleSearch = () => {
    this.props.handleSearch(this.props.value)
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.handleSearch(this.props.value)
    }
  }

  render() {
    const { btnClass, placeholder, customClass } = this.props
    const { text } = this.state
    return (
      <div className={classNames(classes.container, customClass)}>
        <input
          className={classNames(classes.input)}
          type="text"
          value={text || ''}
          placeholder={placeholder || 'Search'}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <a
          className={classNames(classes.btnSearch, btnClass)}
          onClick={this.handleSearch}
        >
          <FontAwesomeIcon
            icon={faSearch}
            className={classes.icon}
          />
        </a>
      </div>
    )
  }
}
