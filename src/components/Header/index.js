import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
import {IoCloseCircle} from 'react-icons/io5'
import {FaSearch} from 'react-icons/fa'

import './index.css'

class Header extends Component {
  state = {
    isShowMenu: false,
    isShowSearch: false,
  }

  onClickHamIcon = () => {
    this.setState({isShowMenu: true})
  }

  onClickCloseButton = () => {
    this.setState({isShowMenu: false})
  }

  onClickSearchTab = () => {
    this.setState(prevState => ({isShowSearch: !prevState.isShowSearch}))
  }

  onClickLogoutButton = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onChangeSearchInput = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  onClickSearchIcon = () => {
    const {enterSearchInput} = this.props
    enterSearchInput()
  }

  render() {
    const {isShowMenu, isShowSearch} = this.state
    const {searchInput} = this.props
    return (
      <>
        <nav className="navbar">
          <div className="navbar-sub-container">
            <ul className="logo-heading-container">
              <Link to="/">
                <li>
                  <img
                    src="https://res.cloudinary.com/dmu5r6mys/image/upload/v1645095409/Group_uiqlwh.png"
                    alt="website logo"
                    className="website-logo"
                  />
                </li>
              </Link>
              <li>
                <h1 className="navbar-heading">Insta Share</h1>
              </li>
            </ul>
            <button
              className="hamburger-button"
              type="button"
              onClick={this.onClickHamIcon}
              // eslint-disable-next-line react/no-unknown-property
              testid="hamburgerMenuIcon"
            >
              <GiHamburgerMenu className="icon" />
            </button>
            <div className="desktop-tabs-container">
              <div className="desktop-search-container">
                <input
                  className="input"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                  type="search"
                  placeholder="Search Caption"
                />
                <button
                  type="button"
                  className="search-button"
                  // eslint-disable-next-line react/no-unknown-property
                  testid="searchIcon"
                  onClick={this.onClickSearchIcon}
                >
                  <FaSearch className="search-icon" />
                </button>
              </div>
              <ul className="navbar-tabs-container">
                <Link to="/" className="link">
                  <li>
                    <p className="tab-item">Home</p>
                  </li>
                </Link>
                <Link to="/my-profile" className="link">
                  <li>
                    <p className="tab-item">Profile</p>
                  </li>
                </Link>
                <li>
                  <button
                    className="logout-button"
                    type="button"
                    onClick={this.onClickLogoutButton}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {isShowMenu && (
          <ul className="mobile-navbar-tabs-container">
            <Link to="/" className="link">
              <li>
                <p className="tab-item">Home</p>
              </li>
            </Link>
            <li>
              <button
                type="button"
                className="search-tab-button"
                onClick={this.onClickSearchTab}
              >
                <p className="tab-item">Search</p>
              </button>
            </li>
            <Link to="/my-profile" className="link">
              <li>
                <p className="tab-item">Profile</p>
              </li>
            </Link>
            <li>
              <button
                className="logout-button"
                type="button"
                onClick={this.onClickLogoutButton}
              >
                Logout
              </button>
            </li>
            <button
              className="hamburger-button"
              type="button"
              onClick={this.onClickCloseButton}
              // eslint-disable-next-line react/no-unknown-property
              testid="closeIcon"
            >
              <IoCloseCircle className="close-icon" />
            </button>
          </ul>
        )}
        {isShowSearch && (
          <div className="search-container">
            <input
              className="input"
              onChange={this.onChangeSearchInput}
              value={searchInput}
              type="search"
              placeholder="Search Caption"
            />
            <button
              type="button"
              className="search-button"
              onClick={this.onClickSearchIcon}
              // eslint-disable-next-line react/no-unknown-property
              testid="searchIcon"
            >
              <FaSearch className="search-icon" />
            </button>
          </div>
        )}
      </>
    )
  }
}
export default withRouter(Header)
