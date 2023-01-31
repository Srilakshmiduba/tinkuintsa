import {Component} from 'react'

import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

import './index.css'

class PostCard extends Component {
  state = {
    isLiked: false,
    counter: 0,
  }

  onClickLike = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {postDetails} = this.props
    const {postId} = postDetails

    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({like_status: true}),
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    this.setState(prevState => ({
      isLiked: true,
      counter: prevState.counter + 1,
    }))
  }

  onClickDislike = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {postDetails} = this.props
    const {postId} = postDetails

    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({like_status: false}),
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    this.setState(prevState => ({
      isLiked: false,
      counter: prevState.counter - 1,
    }))
  }

  render() {
    const {postDetails} = this.props
    const {
      createdAt,
      likeCount,
      userName,
      profilePic,
      caption,
      userId,
      imageUrl,
      comment,
    } = postDetails

    const {isLiked} = this.state

    const {counter} = this.state
    const updateCount = likeCount + counter
    console.log(isLiked)

    return (
      // eslint-disable-next-line react/no-unknown-property
      <li className="post-card-list-item" testid="postCard">
        <div className="profile-username-container">
          <img
            src={profilePic}
            alt="post author profile"
            className="profile-img"
          />
          <Link to={`/users/${userId}`} className="link">
            <h1 className="post-username">{userName}</h1>
          </Link>
        </div>
        <img src={imageUrl} alt="post" className="posts-image" />
        <div className="desktop-styling-posts">
          <div className="reactions-container">
            {!isLiked ? (
              <button
                type="button"
                className="like-button"
                onClick={this.onClickLike}
                // eslint-disable-next-line react/no-unknown-property
                testid="likeIcon"
              >
                <BsHeart className="like-icon" />
              </button>
            ) : (
              <button
                type="button"
                className="like-button"
                onClick={this.onClickDislike}
                // eslint-disable-next-line react/no-unknown-property
                testid="unLikeIcon"
              >
                <FcLike className="liked-icon like-icon" />
              </button>
            )}
            <FaRegComment className="comment-icon" />
            <BiShareAlt className="share-icon" />
          </div>
          <div className="text-container">
            <p className="likes">{updateCount} likes</p>
            <p className="caption">{caption}</p>
            <ul>
              {comment.map(eachItem => (
                <li key={eachItem.user_id} className="comments-container">
                  <p className="comment">
                    <span className="span">{eachItem.user_name}</span>
                    {eachItem.comment}
                  </p>
                </li>
              ))}
            </ul>
            <p className="created">{createdAt}</p>
          </div>
        </div>
      </li>
    )
  }
}
export default PostCard
