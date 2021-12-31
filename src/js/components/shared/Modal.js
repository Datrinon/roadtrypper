import React, { useState, useEffect, useRef } from 'react';
import LoadingGfx from '../shared/LoadingGfx';
import { ModalContainer, ModalHeader, ModalBody, ModalBG } from '../overview/styled/Modal.style';


/**
 * Create a modal element. For optimal use, from your parent component, control
 * its props as state variables. the useModal hook conveniently packages such 
 * state variables; recommend you use that. Anyhow, the props are as follows:
 * @param visible : true if visible; false if not. This controls the display (and visibility) of Modal.
 * @param title : The title of the window.
 * @param confirm :  Optional confirm button to implement in the modal. Provide as
 * an object in {msg: string, callback: fn}. Note that the modal's body will be
 * a form. Alternatively, provide `null` if you don't need a confirm button, in
 * which a `div` will be utilized instead.
 * @param dismissMsg : dismiss text to cancel modal.
 * @param content: Component to place inside of the modal.
 */

const Modal = React.forwardRef(
  ({ visible, title, confirm, dismissMsg, content }, ref) => {
    const [display, setDisplay] = useState(visible);
    const [runningSubmitOp, setRunningSubmitOp] = useState(false);

    const submitButton = useRef();

    useEffect(() => {
      setDisplay(visible);
    }, [visible])

    function closeModal() {
      setDisplay(false);
    }

    function onSubmitModal(e) {
      confirm.callback(e);
      setDisplay(false);
    }

    let Wrapper;

    const dismissButton = (
      <button onClick={closeModal}>{dismissMsg}</button>
    )

    if (confirm === null) {
      Wrapper = ({ content }) => {
        return (
          <div>
            {content}
            <div className="controls">
              {dismissButton}
            </div>
          </div>
        )
      }
    } else {
      Wrapper = ({ content }) => {
        return (
          <form onSubmit={onSubmitModal}>
            {content}
            <LoadingGfx visible={runningSubmitOp} />
            <div className="controls">
              <button type="" ref={submitButton}>{confirm.msg}</button>
              {dismissButton}
            </div>
          </form>
        )
      }
    }

    return (
      <ModalBG
        visible={display}
        ref={ref}>
        <ModalContainer
          className="modal-window">
          <button
            className="modal-exit-button"
            onClick={() => setDisplay(false)}>X</button>
          <h1
            className="modal-heading">
            {title}
          </h1>
          <div
            className="modal-body">
            <Wrapper content={content}>
            </Wrapper>
          </div>
        </ModalContainer>
      </ModalBG>
    )

  }
);

export default Modal
