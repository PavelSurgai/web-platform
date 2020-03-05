import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import ReactDOM from 'react-dom';

import './BottomPopUp.scss';

const BottomPopUp = ({ closeFunction, children }) => {
  const b = block('bottom-pop-up');
  let timeout;
  const [isOpen, setOpened] = useState(false);
  const contentRef = useRef(null);
  const stop = useCallback(e => e.stopPropagation(), []);
  const onMouseDown = useCallback(e => {
    setOpened(false);
    contentRef.current.style = 'top: 100%';
    setTimeout(closeFunction, 500);
    e.stopPropagation();
  }, [closeFunction]);

  useEffect(() => {
    setTimeout(() => setOpened(true), 10);
    contentRef.current.style = `top: ${window.innerHeight - contentRef.current.clientHeight}px`;
    return () => clearTimeout(timeout);
  }, []);

  const popup = (
    <div className={b({ open: isOpen })} onMouseDown={onMouseDown}>
      <div
        className={b('content-container')}
        ref={contentRef}
        onMouseDown={stop}
        onMouseUp={stop}
        onClick={stop}>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    popup,
    document.getElementById('modal-root'),
  );
};

BottomPopUp.propTypes = {
  children: PropTypes.node.isRequired,

  closeFunction: PropTypes.func.isRequired,
};

export default BottomPopUp;
