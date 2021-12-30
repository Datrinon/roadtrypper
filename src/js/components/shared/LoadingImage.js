import React, { useState, useEffect, useRef } from 'react'

/**
 * An image which shows a loading animation prior to it being loaded.
 * @returns 
 */
function LoadingImage({src, alt, callbackOnReady, onClick, classNames}) {

  const signal = useRef(new AbortController());
  const [content, setContent] = useState((<p>Loading!</p>));
  
  function loadImg(signal) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = src;

      console.log(img);

      img.onload = () => {
        resolve(img);
      }

      img.onerror = () => {
        reject(new Error("Could not load the image from the server."));
      }

      if (signal.aborted) {
        reject(new Error("Request cancelled early."));
      }
    });
  }


  useEffect(() => {

    loadImg(signal.current)
    .then((result) => {
      if (onClick) {
        setContent(
        <button
          onClick={onClick}>
          <img
          src={result.src}
          alt={alt}
          className={classNames?.join(" ")}/>
        </button>);
      } else {
        setContent(<img
            src={result.src}
            alt={alt}
            className={classNames?.join(" ")}/>);
      }

      if (callbackOnReady) {
        callbackOnReady();
      }
    })
    .catch((error) => {
      setContent((
        <p>{error.message}</p>
      ))
    })

    return () => {
      signal.current.abort();
    }
  }, [src]);

  
  return (
    <>
      {content}
    </>
  )
}

export default LoadingImage
