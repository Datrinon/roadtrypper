import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <h1 className="error-code">404</h1>
      <p className="error-dialog">The page you were looking for was not found on the site!</p>
      <Link to="/">
        <div className="return-home-button">
          Return Home
        </div>
      </Link>
    </div>
  );
}

export default NotFound;