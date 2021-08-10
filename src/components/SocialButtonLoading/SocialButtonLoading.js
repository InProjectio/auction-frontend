import React from 'react'
import classes from './SocialButtonLoading.scss'
import SocialButton from '../SocialButton'

export default class SocialButtonLoading extends React.Component {
  logout = () => {
    this.nodeRef.logout()
  }

  setNodeRef = (node) => {
    if (node) {
      this.nodeRef = node
    }
  }

  render() {
    const { provider,
      appId,
      onLoginSuccess,
      onLoginFailure,
      customClass,
      classLoading,
      disabled,
      loading,
      children,
      loadingGray
    } = this.props
    return (
      <SocialButton
        provider={provider}
        appId={appId}
        onLoginSuccess={onLoginSuccess}
        onLoginFailure={onLoginFailure}
        customClass={customClass}
        disabled={disabled || loading}
        ref={(socialButon) => this.socialButon = socialButon}
        getInstance={this.setNodeRef}
      >
        {
            loading
              ? (
                <a className={classLoading}>
                  <img src={loadingGray ? '/spinner-gray.gif' : '/spinner.gif'} alt="spinner" className={classes.spinner} />
                </a>
              )
              : (
                <>
                  { children }
                </>
              )
          }
      </SocialButton>
    )
  }
}
