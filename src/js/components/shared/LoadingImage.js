import React, { useState, useEffect, useRef } from 'react'
import * as s from '../styled/template.style';

/**
 * An image which shows a loading animation prior to it being loaded.
 * @returns 
 */
function LoadingImage({path, alt}) {

  const signal = useRef(new AbortController());
  const [image, setImage] = useState((<p>Loading!</p>));
  const [imageLoading, setImageLoading] = useState(true);
  
  function loadImg(signal) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = path;

      console.log(img);

      img.onload = () => {
        setImageLoading(false);
        resolve(img);
      }

      img.onerror = () => {
        setImageLoading(false);
        reject(new Error("Could not load the image from the server."));
      }

      if (signal.aborted) {
        reject(new Error("Request cancelled early."));
      }
    });
  }


  useEffect(() => {
    loadImg(signal.current).then((result) => {
      setImage((
        <s.Photo
          src={result.src}
          alt={alt}
        />
      ))
    });

    return () => {
      signal.current.abort();
    }
  }, []);

  
  return (
    <div className="le-loading-image">
      {image}
    </div>
  )
}

export default LoadingImage
