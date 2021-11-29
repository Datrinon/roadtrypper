import React, { useState, useRef, useEffect } from 'react'

/**
 * A hook for managing the state of a Modal. Call this hook from the component
 * in which you need the modal.
 * 
 * The parameters are provided in an object as follows:
 * @param {object} init - Object to initialize the modal with. It should
 * have the following properties...:
 * @prop {boolean} visible - True if visible, false if not.
 * @prop {string} title - The title for the modal.
 * @prop {object} confirm - Optional confirm button to implement in the modal.
 * Provide as an object in {msg: string, callback: fn}.
 * @prop {element} modalContents - the contents of the modal. 
 * 
 * Returns the following as an array.
 * @returns values - the current values of the parameters set above (excl. `init`).
 * @returns mutators - mutators for the values of the parameters.
 * @returns modalRef - a ref variable for the modal. Please assign this to `ref=` attribute of your Modal.
 */
function useModal(init = null) {
  const [modalVisible, setModalVisible] = useState(init?.visible ?? false);
  const [modalTitle, setModalTitle] = useState(init?.title ?? "");
  const [modalConfirm, setModalConfirm] = useState(init?.confirm ?? null);
  const [modalDismiss, setModalDismiss] = useState(init?.dismiss ?? "");
  const [modalContents, setModalContents] = useState(init?.contents ?? null);

  const modalRef = useRef();
  const modalObserver = useRef();
  // why useRef?
  /**
   * Assignments to the 'modalObserver' variable from inside React Hook useEffect
   * will be lost after each render. To preserve the value over time, store it
   * in a useRef Hook and keep the mutable value in the '.current' property.
   * 
   * Additionally, I need a ref for the modal to keep track of its CSS properties.
   * Especially if it gets display none.
   */


  // The purpose of this effect is to keep track of if the modal closes.
  // this allows us to sync the state variable in charge of modal visibility.
  useEffect(() => {
    const config = { attributes: true, childList: false, subtree: true };
    const callback = () => {
      const modalStyle = getComputedStyle(modalRef.current);
      if (modalStyle.display === 'none') {
        setModalVisible(false);
      }
    }

    modalObserver.current = new MutationObserver(callback);
    modalObserver.current.observe(modalRef.current, config);

    return () => {
      modalObserver.current.disconnect();
    }
  }, []);

  // Use this effect to disable click events...? Do we need to? Wait on that
  // until we apply CSS.

    const values = {
      visible: modalVisible,
      title: modalTitle,
      confirm: modalConfirm,
      dismiss: modalDismiss,
      content: modalContents
    };

    const mutators = {
      setVisible: setModalVisible,
      setTitle: setModalTitle,
      setConfirm: setModalConfirm,
      setDismiss: setModalDismiss,
      setContent: setModalContents
    };

    return [
      values,
      mutators,
      modalRef
    ];
}

export default useModal;