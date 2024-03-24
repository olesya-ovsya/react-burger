import React from 'react';

export default class ModalOverlay extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
      visible: false,
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

    handleOpenModal() {
    this.setState({ visible: true });
  }

    handleCloseModal() {
    this.setState({ visible: false });
  }

  render() {
    return (
        <>
            {
                this.props.visible && (
                    <div style={{overflow: 'hidden'}}>
                        {this.props.children}
                    </div>)
            }
        </>
    );
  }
}