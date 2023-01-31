import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import InstaShareStories from '../InstaShareStories'
import InstaSharePosts from '../InstaSharePosts'
import SearchPostCard from '../SearchPostCard'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchResultsList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.renderSearchResults()
  }

  renderSearchResults = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.posts.map(eachItem => ({
        createdAt: eachItem.created_at,
        likeCount: eachItem.likes_count,
        postId: eachItem.post_id,
        profilePic: eachItem.profile_pic,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
        caption: eachItem.post_details.caption,
        imageUrl: eachItem.post_details.image_url,
        comment: eachItem.comments,
      }))
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        searchResultsList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  enterSearchInput = () => {
    this.renderSearchResults()
  }

  onClickTryAgain = () => {
    this.renderSearchResults()
  }

  renderSearchPosts = () => {
    const {searchResultsList} = this.state

    return (
      <>
        {searchResultsList.length === 0 ? (
          <div className="search-failure-container">
            <img
              src="https://res.cloudinary.com/dvhsld4s4/image/upload/v1650100727/Groupsearchnotfound_wi36sm.png"
              alt="search not found"
              className="search-failure-image"
            />
            <h1 className="search-failure-heading">Search Not Found</h1>
            <p className="search-failure-text">
              Try different keyword or search again
            </p>
          </div>
        ) : (
          <div className="search-results-container">
            <h1 className="search-heading">Search Results</h1>
            <ul className="posts-main-container">
              {searchResultsList.map(eachPost => (
                <SearchPostCard key={eachPost.postId} postDetails={eachPost} />
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }

  renderLoader = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={25} width={25} />
    </div>
  )

  renderFailure = () => <FailureView retryFunction={this.onClickTryAgain} />

  renderAllSearchResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSearchPosts()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
        />
        {searchInput !== '' ? (
          <div className="search-results-container">
            {this.renderAllSearchResults()}
          </div>
        ) : (
          <div className="home-container">
            <InstaShareStories />
            <hr className="home-line" />
            <InstaSharePosts />
          </div>
        )}
      </>
    )
  }
}
export default Home
