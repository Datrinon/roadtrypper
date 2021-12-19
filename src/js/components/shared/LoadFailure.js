import React from 'react'
import { Link } from 'react-router-dom'


function LoadFailure({error}) {

  console.log(error);

  return (
    <div>
      <p>
        Failed to load project.
      </p>
      <p>
        Error Message:
        <span>{error}</span>
      </p>
      <Link to="/trips/">Return to Trip Overview</Link>
    </div>
  )
}

export default LoadFailure
