import React, { useState } from 'react'
import PropTypes from 'prop-types';


function CountingTextArea({textAreaId, labelText, limit, startText="", classNames}, ref) {

  const [text, setText] = useState(startText);
  const [charRemaining, setCharRemaining] = useState(limit);

  function onTextAreaChange(e) {
    setText(e.target.value);

    setCharRemaining(limit - e.target.value.length);
  }
  

  return (
    <div className={[...classNames]} ref={ref}>
      <label htmlFor={textAreaId}>
        {labelText}
        <textarea
          id={textAreaId}
          type="text"
          maxLength={limit}
          value={text}
          onChange={onTextAreaChange}
           />
        <span>{charRemaining} characters left</span>
      </label>
    </div>
  )
}

export default CountingTextArea

CountingTextArea.defaultProps = {
  textAreaId: "text-area",
  limit: 500
}

CountingTextArea.propTypes = {
  textAreaId: PropTypes.string,
  limit: PropTypes.number
}