import './index.css'

const FailureView = props => {
  const {retryFunction} = props

  const retry = () => {
    retryFunction()
  }

  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dvhsld4s4/image/upload/v1650052919/Group_7522failureImage_zfixuj.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button className="failure-button" type="button" onClick={retry}>
        Try again
      </button>
    </div>
  )
}

export default FailureView
