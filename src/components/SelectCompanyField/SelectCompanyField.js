import React, { Component } from 'react'
import AutoSuggest from 'react-autosuggest'
import * as Api from 'api/api'
import { renderField } from 'Form'
import defaultCompanyLogo from 'images/defaultLogoCompany.jpg'
import CompanyStatus from 'components/CompanyStatus'
import classes from './SelectCompanyField.module.scss'

const getSuggestionValue = (suggestion) => `${suggestion._id}`

const renderSuggestion = (suggestion) => (
  <div className={classes.suggestionItemPopup}>
    <img src={suggestion.logo || defaultCompanyLogo} className={classes.logo} alt="logo" />
    <div className={classes.rowBetween}>
      <p className={classes.companyName}>
        { suggestion.companyName }
      </p>
      <CompanyStatus status={suggestion.status} />
    </div>
  </div>
)

class SelectCompanyField extends Component {
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
        const result = await Api.auction.get({
          url: '/api/company/find-list',
          params: {
            textSearch: value
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

  handleSuggestionSelected = (event, { suggestion }) => {
    event.preventDefault()
    this.props.input.onChange(suggestion)
    this.setState({
      inputText: suggestion.companyName
    })
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
            placeholder: placeholder || 'Search company',
            onChange: this.handleChange,
          }}

        />
      </div>
    )
  }
}

export default renderField(SelectCompanyField)
