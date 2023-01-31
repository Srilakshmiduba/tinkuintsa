import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import PostCard from '../PostCard'

import './index.css'
import FailureView from '../FailureView'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

class InstaSharePosts extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    instaPostsList: [],
    commentsList: [],
  }

  componentDidMount() {
    this.renderInstaPosts()
  }

  renderInstaPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
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
      //  console.log(updatedData)
      const commentData = data.posts.map(eachItem => ({
        comments: eachItem.comments,
      }))
      console.log(commentData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        instaPostsList: updatedData,
        commentsList: commentData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPosts = () => {
    const {instaPostsList, commentsList} = this.state

    return (
      <ul className="posts-main-container">
        {instaPostsList.map(eachPost => (
          <PostCard
            key={eachPost.postId}
            postDetails={eachPost}
            commentsDetails={commentsList}
          />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={25} width={25} />
    </div>
  )

  onClickTryAgain = () => {
    this.renderInstaPosts()
  }

  renderFailure = () => <FailureView retryFunction={this.onClickTryAgain} />

  renderAllInstaPosts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPosts()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div className="main-container">{this.renderAllInstaPosts()}</div>
  }
}
export default InstaSharePosts
