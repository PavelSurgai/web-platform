import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './Modal.scss';

const Modal = ({ closeFunction, children, widthContent }) => {
  const b = block('modal');

  const stop = e => e.stopPropagation();

  const content = (
    <div className={b()} onMouseDown={() => closeFunction()}>
      <div className={b('content-container')} onMouseDown={stop} onMouseUp={stop} onClick={stop} style={{ width: widthContent }}>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-root'),
  );
};

Modal.propTypes = {
  closeFunction: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  widthContent: PropTypes.string,
};

export default Modal;
