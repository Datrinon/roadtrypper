import React, { useState } from 'react'
import PropTypes from 'prop-types';


const CountingTextArea = React.forwardRef(
  ({
    textAreaId,
    labelText,
    limit,
    startText = "",
    placeholder = "",
    classNames
  },
    ref) => {

    const [text, setText] = useState(startText);
    const [charRemaining, setCharRemaining] = useState(limit);

    function onTextAreaChange(e) {
      setText(e.target.value);

      setCharRemaining(limit - e.target.value.length);
    }


    return (
      <div className={[...classNames]}>
        <label
          className="label"
          htmlFor={textAreaId}>
          {labelText}
        </label>
        <textarea
          ref={ref}
          id={textAreaId}
          className={"text-area"}
          type="text"
          maxLength={limit}
          placeholder={placeholder}
          value={text}
          onChange={onTextAreaChange}
          />
        <span
          className="char-rem">
            {charRemaining} characters left
        </span>
      </div>
    )
  }
);

export default CountingTextArea

CountingTextArea.defaultProps = {
  textAreaId: "text-area",
  limit: 500
}

CountingTextArea.propTypes = {
  textAreaId: PropTypes.string,
  limit: PropTypes.number
}