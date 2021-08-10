import React, { Component } from 'react'
import AutoSuggest from 'react-autosuggest'
import { FormattedMessage } from 'react-intl'
import * as Api from 'api/api'
import classes from './AutoSuggestion.module.scss'

const getSuggestionValue = (suggestion) => `${suggestion.signedText}`

const renderSuggestion = (suggestion) => (
  <div className={classes.suggestionItemPopup}>
    <span>
      {' '}
      { suggestion.signedText }
      {' '}
    </span>
  </div>
)

export default class AutoSuggestionComponent extends Component {
  timeout = null

  constructor(props) {
    super(props)
    this.state = {
      inputText: props.textSearch || '',
      suggestions: []
    }
  }

  onSuggestionsFetchRequested = async ({ value }) => {
    try {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(async () => {
        const result = await Api.get({
          url: '/dynamic/public/quick-search',
          params: {
            unsignedText: value
          }
        })
        this.setState({
          suggestions: result.data
        })
      }, 500)
    } catch (e) {
      console.log(e)
    }
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  handleChange = (event) => {
    this.setState({
      inputText: event.target.value
    })
  }

  removeSuggestion = () => () => {
  }

  handleSuggestionSelected = (event, { suggestion }) => {
    event.preventDefault()
    this.props.handleSearch({
      textSearch: suggestion.signedText
    })
    this.setState({
      inputText: suggestion.signedText
    })
  }

  handleSearch = () => {
    this.props.handleSearch({
      textSearch: this.state.inputText
    })
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.handleSearch({
        textSearch: this.state.inputText
      })
    }
  }

  render() {
    const { suggestions,
    } = this.state
    const { placeholder } = this.props
    const { inputText } = this.state
    return (
      <div className={classes.container}>
        <AutoSuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={this.handleSuggestionSelected}
          inputProps={{
            value: inputText,
            placeholder: placeholder || 'Tìm kiếm phụ tùng: tên xe, dòng xe',
            onChange: this.handleChange,
            onKeyDown: this.handleKeyDown
          }}

        />
        <div
          className={classes.search}
          onClick={this.handleSearch}
        >
          <div className={classes.divider} />
          <FormattedMessage
            id="SearchComponent.search"
            defaultMessage="Tìm kiếm"
          />
        </div>
      </div>
    )
  }
}
