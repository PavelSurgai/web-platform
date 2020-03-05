import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './Modal.scss';

const Modal = ({ closeFunction, children, widthContent, heightContent }) => {
  const b = block('modal');

  const stop = e => e.stopPropagation();

  return (
    <div className={b()} onTouchStart={() => closeFunction()}>
      <div className={b('content-container')} onTouchStart={stop} onTouchEnd={stop} onClick={stop} style={{ width: widthContent, height: heightContent }}>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeFunction: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  widthContent: PropTypes.string,
  heightContent: PropTypes.string,
};

export default Modal;
