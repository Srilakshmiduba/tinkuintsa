import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <>
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dmu5r6mys/image/upload/v1645245215/Layer_1_blfsev.png"
        alt="page not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-text">
        we are sorry, the page you requested could not be found
      </p>
      <p className="not-found-text"> Please go back to the homepage</p>
      <Link to="/">
        <button type="button" className="not-found-button">
          Home Page
        </button>
      </Link>
    </div>
  </>
)
export default NotFound
