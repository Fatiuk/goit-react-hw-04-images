import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalWrap } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ largeImageURL, tags }) => {
  useEffect(() => {
    document.documentElement.style.overflowY = 'hidden';
    document.addEventListener('keydown', handleKeyClose);
  }, []);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflowY = 'auto';
      document.removeEventListener('keydown', handleKeyClose);
    };
  }, []);

  const handleKeyClose = event => {
    if (event.key === 'Escape' || event.key === ' ') {
      this.props.onClose();
    }
  };

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalWrap>
        <img src={largeImageURL} alt={tags} />
      </ModalWrap>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
