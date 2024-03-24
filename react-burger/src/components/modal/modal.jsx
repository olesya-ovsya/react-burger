import React from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends React.Component {
    render() {
      const { children, header, onClose, ref } = this.props;
      return ReactDOM.createPortal(
              (
                  <>
                  {children}
                      {/*<div className="modal">
                      <ModalHeader onClose={onClose}>{header}</ModalHeader>
                          {children}
                      </div>
              <ModalBackDrop onClose={onClose} />*/}
                  </>
              ), 
              ref
          );
    }
}