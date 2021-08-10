import React, { Component } from 'react'
import Dropdown from 'components/Dropdown'
import { FormattedMessage } from 'react-intl'
import logo from 'images/logo.png'
import { Link, NavLink } from 'react-router-dom'
import classNames from 'classnames'
import history from 'utils/history'
import web3 from 'utils/smartContract/web3'
import defaultAvatar from 'images/defaultAvatar.svg'
import EventEmitter from 'utils/EventEmitter'
import marketPlaceIcon from 'images/marketplace.svg'
import buildingIcon from 'images/building.svg'
import chatIcon from 'images/chat.svg'
import Transactions from 'components/Transactions'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { showNotification } from 'layout/CommonLayout/actions'
import * as storage from 'utils/storage'
import * as Api from 'api/api'
import SelectCompany from './SelectCompany'
import MyWallet from './MyWallet'
import Avatar from './Avatar'
import MenuButton from './MenuButton'
import classes from './Header.module.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentAccount: null,
      showWallet: false,
      userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
      isLoggedIn: !!localStorage.getItem('accessToken'),
      showSelectCompany: false
    }
  }

  async componentDidMount() {
    this.checkUserMapping()
    const walletAddress = localStorage.getItem('walletAddress')
    if (web3) {
      window.ethereum.on('disconnect', () => {
        console.log('disconnect =====>')
      });
      window.ethereum.on('chainChanged', (chain) => {
        console.log('accountsChanged ===>', chain)
      });
      window.ethereum.on('networkChanged', (networkId) => {
        console.log('networkChanged', networkId);
      });
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log('accountsChanged ==================>', accounts)
        localStorage.setItem('walletAddress', accounts[0])
        this.setState({
          currentAccount: accounts[0]
        })
      });
      // const walletAddress = localStorage.getItem('walletAddress')
      this.setState({
        currentAccount: walletAddress
      })
    }

    EventEmitter.on('userInfo', (values) => {
      this.setState({
        userInfo: values
      })
    })
  }

  checkUserMapping = async () => {
    const { userInfo, isLoggedIn } = this.state
    if (!userInfo.userMapping && isLoggedIn) {
      const result = await Api.auction.get({
        url: '/api/company/user-mapping/detail',
        params: {
          userId: userInfo._id
        }
      })

      if (result.data) {
        this.setState({
          userInfo: {
            ...userInfo,
            userMapping: result.data
          }
        })

        const newUserInfo = JSON.stringify({
          ...userInfo,
          userMapping: result.data
        })

        localStorage.setItem('userInfo', newUserInfo)
        localStorage.setItem('companyId', result.data?.company)
        storage.setItem('userInfo', newUserInfo)
        storage.setItem('companyId', result.data?.company)
      }
    }
  }

  handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('walletAddress')
    localStorage.removeItem('companyId')
    storage.logout()
    history.push('/auth/login')
  }

  handleToogleMenu = () => {
    const {
      showMenuClass,
      handleShowMenuMobile,
      handleHideMenu,
    } = this.props
    if (showMenuClass) {
      handleHideMenu()
    } else {
      handleShowMenuMobile()
    }
  }

  handleConnectToMetaMask = async () => {
    const { currentAccount } = this.state
    if (currentAccount) {
      this.viewWallet()
      return
    }
    if (window.web3) {
      const chainId = await web3.eth.getChainId()
      try {
        if (chainId !== 97) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x61',
              chainName: 'Inproject',
              nativeCurrency: {
                name: 'Binance Coin',
                symbol: 'BNB',
                decimals: 18
              },
              rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
              blockExplorerUrls: ['https://testnet.bscscan.com/']
            }]
          })
          const accounts = await web3.eth.getAccounts();
          this.setState({
            currentAccount: accounts[0]
          })
          localStorage.setItem('walletAddress', accounts[0])
          return
        }
        const accounts = await web3.eth.getAccounts();
        if (accounts && accounts.length > 0) {
          await window.ethereum.request({
            method: 'wallet_requestPermissions',
            params: [
              {
                eth_accounts: {}
              }
            ]
          });
          const newAccounts = await web3.eth.getAccounts();
          this.setState({
            currentAccount: newAccounts[0]
          })
          localStorage.setItem('walletAddress', newAccounts[0])
        } else {
          const walletAddress = await window.ethereum.request({
            method: 'eth_requestAccounts',
            params: [
              {
                eth_accounts: {}
              }
            ]
          });
          this.setState({
            currentAccount: walletAddress[0]
          })
          localStorage.setItem('walletAddress', walletAddress[0])
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      this.props.showNotification({
        type: 'ERROR',
        message: 'Connect error please install MetaMask plugin'
      })
    }
  }

  viewWallet = () => {
    this.setState({
      showWallet: true
    })
  }

  handleCloseWallet = () => {
    this.setState({
      showWallet: false
    })
  }

  handleLogoutWallet = () => {
    this.setState({
      currentAccount: ''
    })
    localStorage.removeItem('walletAddress')
  }

  handleShowSelectCompany = () => {
    this.setState({
      showSelectCompany: true
    })
  }

  handleCloseSelectCompany = () => {
    this.setState({
      showSelectCompany: false
    })
  }

  render() {
    const {
      handleToggleMenu,
      collapse,
      showMenuClass,
      showLogo,

    } = this.props

    const { currentAccount, showWallet, userInfo, isLoggedIn, showSelectCompany } = this.state

    return (
      <div className={classes.container}>
        <div className={classNames(classes.left, collapse && classes.leftCollapse)}>
          { handleToggleMenu
            && (
            <MenuButton
              handleToggleMenu={handleToggleMenu}
              active={collapse}
            />
            )}

          { showLogo
            && (
              <Link
                className={classes.logoWrapper}
                to="/"
              >
                <img src={logo} className={classes.logo} alt="logo" />
              </Link>
            )}

          <NavLink
            className={classes.marketPlace}
            to="/market-place"
            activeClassName={classes.hidden}
            exact
          >
            <img src={marketPlaceIcon} className={classes.marketPlaceIcon} alt="icon" />
            <FormattedMessage
              id="Header.marketPlace"
              defaultMessage="Marketplace"
            />
          </NavLink>

          { isLoggedIn && userInfo.userMapping
            && (
              <NavLink
                className={classes.marketPlace}
                to="/company"
                activeClassName={classes.hidden}
              >
                <img src={buildingIcon} className={classes.marketPlaceIcon} alt="icon" />
                <FormattedMessage
                  id="Header.company"
                  defaultMessage="My company"
                />
              </NavLink>
            )}

        </div>
        <div className={classes.right}>
          { isLoggedIn && !userInfo.userMapping
            && (
            <a
              className={classes.btnJoinCompany}
              activeClassName={classes.hidden}
              onClick={this.handleShowSelectCompany}
            >
              Join company
            </a>
            )}
          { isLoggedIn && !userInfo.userMapping
            && (
            <NavLink
              className={classes.btnBecomeCompany}
              to="/register-company"
              activeClassName={classes.hidden}

            >
              Become company?
            </NavLink>
            )}

          { isLoggedIn && userInfo.userMapping
            && (
            <NavLink
              className={classes.btnChat}
              to="/chat"
              activeClassName={classes.hidden}

            >
              <img src={chatIcon} className={classes.chatIcon} alt="chat" />
              Chat
            </NavLink>
            )}
          { isLoggedIn
            ? (
              <>
                <a
                  className={classes.connect}
                  onClick={this.handleConnectToMetaMask}
                >
                  { currentAccount
                    ? `${currentAccount.slice(0, 4)}...${currentAccount.slice(currentAccount.length - 4, currentAccount.length)}`
                    : 'Connect' }
                </a>
                <div className={classes.transactions}>
                  <Transactions />
                </div>

                <Dropdown
                  mainComponent={(
                    <div className={classes.userName}>
                      <p className={classes.name}>
                        { userInfo.fullname || userInfo.username }
                      </p>
                      <Avatar avatar={userInfo.avatar_url || defaultAvatar} />
                    </div>
                )}
                  childrenComponent={(handleClose) => (
                    <div className={classes.menus}>
                      <Link
                        className={classes.dropdownItem}
                        to="/settings/account"
                        onClick={handleClose}
                      >
                        My Account
                      </Link>
                      <Link
                        className={classes.dropdownItem}
                        to="/settings/change-password"
                        onClick={handleClose}
                      >
                        Change Password
                      </Link>
                      <div
                        className={classes.dropdownItem}
                        onClick={this.handleLogout}
                      >
                        <FormattedMessage
                          id="Header.logout"
                          defaultMessage="Logout"
                        />
                      </div>
                    </div>
                  )}
                />
              </>
            )
            : (
              <div className={classes.actions}>
                <Link
                  to="/auth/login"
                  className={classNames(classes.btn)}
                >
                  <FormattedMessage
                    id="UserHeader.login"
                    defaultMessage="Login"
                  />
                </Link>
                <Link
                  to="/auth/register"
                  className={classNames(classes.btn, classes.btnRegister)}
                >
                  <FormattedMessage
                    id="UserHeader.register"
                    defaultMessage="Sign up"
                  />
                </Link>
              </div>
            )}
        </div>

        <div className={classes.headerMenu}>
          <MenuButton
            handleToggleMenu={this.handleToogleMenu}
            active={showMenuClass}
          />
          <a
            className={classes.logout}
            onClick={this.handleLogout}
          >
            <FormattedMessage
              id="Header.logout"
              defaultMessage="Logout"
            />
          </a>
        </div>
        <MyWallet
          show={showWallet}
          currentAccount={currentAccount}
          handleClose={this.handleCloseWallet}
          handleLogoutWallet={this.handleLogoutWallet}
        />

        <Modal
          show={showSelectCompany}
          onHide={this.handleCloseSelectCompany}
        >
          <SelectCompany handleClose={this.handleCloseSelectCompany} />
        </Modal>
      </div>
    )
  }
}

export default connect(null, {
  showNotification
})(Header)
