import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const ModalHeader = styled.h1`
  border: 1px solid black;
`

const ModalContainer = styled.div`
  border: 1px solid lime;
  display: ${props => props.visible ? "initial" : "none"};
`

const ModalBody = styled.div`
  border: 1px solid fuchsia;
`

/**
 * Create a modal element. For optimal use, from your parent component, control
 * its props as state variables. the useModal hook conveniently packages such 
 * state variables; recommend you use that. Anyhow, the props are as follows:
 * @param visible : true if visible; controls display of Modal.
 * @param title : The title of the window.
 * @param confirm :  Optional confirm button to implement in the modal. Provide as
 * an object in {msg: string, callback: fn}. Note that the modal's body will be
 * a form. Alternatively, provide `null` if you don't need a confirm button, in
 * which a `div` will be utilized instead.
 * @param dismissMsg : dismiss text to cancel modal.
 * @param content: Component to place inside of the modal.
 */

const Modal = React.forwardRef(
({visible, title, confirm, dismissMsg, content }, ref) => {
    const [display, setDisplay] = useState(visible);

    useEffect(() => {
      setDisplay(visible);
    }, [visible])

    function closeModal() {
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
          <form onSubmit={confirm.callback}>
            {content}
            <div className="controls">
              <button type="">{confirm.msg}</button>
              {dismissButton}
            </div>
          </form>
        )
      }
    }

    return (
      <ModalContainer
        visible={display}
        ref={ref}>
        <button onClick={() => setDisplay(false)}>X</button>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Wrapper content={content}>
          </Wrapper>
        </ModalBody>
      </ModalContainer>
    )

  }
);

export default Modal
