function unloadWarning(e) {
  // browser support: 
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
  let confirmationMessage = "\\o/";
  e.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34-51
  return confirmationMessage;          // Gecko, WebKit, Chrome <34
}

function onUpdatingStart() {
  window.addEventListener("beforeunload", unloadWarning);

  document.querySelector(".timestamp")?.classList.add("no-display");
  document.querySelector(".loading")?.classList.remove("no-display");
}

function onUpdatingEnd() {
  window.removeEventListener("beforeunload", unloadWarning);

  document.querySelector(".timestamp")?.classList.remove("no-display");
  document.querySelector(".loading")?.classList.add("no-display");
}

export { onUpdatingStart, onUpdatingEnd }