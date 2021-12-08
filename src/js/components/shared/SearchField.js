import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { debounce } from 'lodash';


const BlockButton = styled.button`
  display: block;

  &:focus {
    border: 1px solid red;
    background-color: red;
  }
`

/**
 * Generic Searchbar which provides an arrow-key navigatable list of suggestions. 
 * Please provide all of the following parameters to use this component. You may
 * also provide a ref if you wish to get a reference to the value of the searchbar,
 * which is useful for updating its value based on the result.
 * @param {function: returns []} fetchForSuggestions - A callback to invoke and
 * obtain suggestions. It should return an array of results.
 * @param {function} suggestionMap - A callback which maps suggestions into elements.
 * @param {function} onSearchCallback - A callback to invoke when the user
 * presses SEARCH. Ideally, this should be the same click callback that you use
 * inside of your suggestionMap.
 * @param {number} debounceTimer - A timer to wait to expire before invoking the 
 * fetch suggestions.
 * @param {number} fasterFirstSearch - Optional timer for the first search. This
 * is used because some APIs restrict the # of times they can be called for 
 * a given duration of time. In such cases, it would be useful to have the first
 * API call invoke faster than the subsequent ones. Provide `null` if you do not 
 * need it.
 * @param {string[]} classNames - Class names that should be given to the search field container.
 * 
 * @returns `JSXElement` -- Searchbar component.
 */
const SearchField = React.forwardRef(({
  fetchForSuggestions,
  suggestionMap,
  onSearchCallback,
  debounceTimer,
  fasterFirstSearch,
  placeholder,
  classNames }, ref) => {

  const [suggestions, setSuggestions] = useState(null);
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const [invalidSearchTerm, setInvalidSearchTerm] = useState(null);
  const [submitPressed, setSubmitPressed] = useState(false);
  const [onFirstSearch, setOnFirstSearch] = useState(false);

  const currentFocused = useRef(0);
  const formInput = useRef();

  let generateSuggestions;
  if (!!fasterFirstSearch) {
    generateSuggestions = debounce(onSearchFieldInput, (onFirstSearch ? fasterFirstSearch : debounceTimer));
  } else {
    generateSuggestions = debounce(onSearchFieldInput, debounceTimer);
  }

  function renderSearchResults(results) {
    let listedResults = results.map(suggestionMap);

    // prevents bubbling up throug hthe dom tree, which would cause 
    // the block button to be "clicked" again repeatedly and continuously
    // trigger the event, crashing the program.
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });

    listedResults = listedResults.map(elem => {
      return (
        <BlockButton
          onClick={(e) => {
            setDisplaySuggestions(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.querySelector("*").dispatchEvent(clickEvent);
            }
          }}
          className="search-result">
          {elem}
        </BlockButton>
      )
    });

    setSuggestions(listedResults);
  }

  async function onSearchFieldInput() {
    if (onFirstSearch) {
      setOnFirstSearch(false);
    }
    if (ref.current.value.length === 0) {
      setSuggestions();
      return;
    }

    try {
      const results = await fetchForSuggestions();

      renderSearchResults(results);
    } catch (error) {
      console.log(error);
    }
  }

  /**
 * When the user presses the search button, just get the first result from
 * what the suggestions box would have shown.
 * @param {*} e - Submit Event.
 */
  async function handleSearch(e) {
    e.preventDefault();

    // clear out invocations queue, since the user has already confirmed their search.
    generateSuggestions.cancel();
    // clear suggestions field.
    setSuggestions();

    // disable search button to prevent api from being overloaded.
    setSubmitPressed(true);

    const results = await fetchForSuggestions();

    setSubmitPressed(false);

    if (results[0]) {
      onSearchCallback(results[0]);
      currentFocused.current = 0;
    } else {
      // else invalid search, and just show the user no place found.  
      setInvalidSearchTerm(ref.current.value);
    }
  }

  // this handles behavior for arrow key navigation.
  const handleArrowKeyPress = (e) => {
    // check if user pressed escape, if so, then remove the binding.
    if (e.code === "Escape") {
      removeArrowKeyPress(e);
      return;
    }

    // then, filter out any non-arrow key presses.
    if (e.code !== "ArrowDown" && e.code !== "ArrowUp") {
      return;
    }
    // at this point, disable arrow key behavior.
    e.preventDefault();

    // now we can query select all the elements. (input field + all search results)
    const focusables = Array.from(document.body.querySelectorAll(
      ".search-field, .search-results > *:not(.search-result-failure)"
    ));

    // focus on the element with index equal to currentFocused 

    // then, focus on the next or previous element.
    switch (e.code) {
      case "ArrowDown":
        nextFocused(focusables);
        break;
      case "ArrowUp":
        previousFocused(focusables);
        break;
      default:
        break;
    }
  }

  /**
   * Moves focus to the next focused result.
   * @param {HTMLElement[]} focusables - An array of focusable elements to cycle focus through.
   */
  function nextFocused(focusables) {

    if (currentFocused.current >= (focusables.length - 1)) {
      currentFocused.current = 0;
    } else {
      currentFocused.current = currentFocused.current + 1;
    }

    focusables[currentFocused.current].focus();
  }

  /**
   * Moves focus to the previous focused result.
   * @param {HTMLElement[]} focusables - An array of focusable elements to cycle focus through.
   */
  function previousFocused(focusables) {
    if (currentFocused.current - 1 < 0) {
      currentFocused.current = (focusables.length - 1);
    } else {
      currentFocused.current = currentFocused.current - 1;
    }

    focusables[currentFocused.current].focus();
  }

  /**
   * Removes the listener for arrow key navigation when clicking outside of the form
   * or pressing ESCAPE.
   */
  function removeArrowKeyPress(e) {
    if (e instanceof KeyboardEvent || !e.composedPath().includes(formInput.current)) {
      window.onkeydown = null;
      window.onclick = null;
      currentFocused.current = 0;
      setDisplaySuggestions(false);
    }
  }

  function onFormFocus(e) {
    // this allows interactivity with arrow keys.
    window.onkeydown = handleArrowKeyPress;
    // however, clicking on the window, we evaluate whether or not to remove that functionality.
    window.onclick = removeArrowKeyPress;

    // additionally, we set displaySuggestions to true in case
    // it was set to false previously to hide it (since it was out of focus).
    setDisplaySuggestions(true);
  }

  return (
    <form
      className={`${[...classNames]}`}
      ref={formInput}
      onFocus={onFormFocus}
      onSubmit={handleSearch}>
      <div>
        <input
          className="search-field"
          ref={ref}
          // Set to 1000 because of nominatim's usage policy requirements.
          onKeyDown={generateSuggestions}
          onChange={() => setInvalidSearchTerm(null)}
          type="search"
          disabled={submitPressed}
          placeholder={placeholder}
        />
        <button type="submit" disabled={submitPressed}>Search</button>
        {
          submitPressed &&
          <span className="loading">
            <FontAwesomeIcon icon={faSpinner} />
          </span>
        }
      </div>
      <div className="search-results">
        {displaySuggestions && suggestions}
      </div>
      {
        invalidSearchTerm &&
        <div className="search-result-failure">
          No results found for '{invalidSearchTerm}'.
        </div>
      }
    </form>
  )
});


export default SearchField
